import { EyeFilledIcon } from "../components/ui/EyeFilledIcon"
import { EyeSlashFilledIcon } from "../components/ui/EyeSlashFilledIcon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormItem, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from "react"
import transition from "@/lib/transition"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "lucide-react"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import { toast } from "@/components/ui/use-toast"
import axios from "@/api/axios"
import { useLocation } from "react-router-dom"
import ViewTransitionLink from "@/components/ViewTransitionLink"

const schema = z.object({
    username: z.string().trim().min(3, 'Длина должна быть от 3 до 16 символов').max(16, 'Длина должна быть от 3 до 16 символов'),
    email: z.string().email('Неправильный формат почты'),
    password: z.string().trim().min(6, 'Не менее 6 символов').max(32, 'Не более 32 символов'),
    passwordConfirmation: z.string()
}).refine(
    (values) => values.password === values.passwordConfirmation,
    {
        message: "Пароли не совпадает",
        path: ["passwordConfirmation"]
    }
)

const SignUp = () => {
    const navigate = useViewNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'
    const options = { state: (from === '/') ? null : { from: location.state.from } }
    const inputRef = useRef(null)
    const sourceRef = useRef(null)

    const [isLoading, setLoading] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const togglePassVisibility = () => transition(() => setIsPassVisible(prev => !prev))

    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        resolver: zodResolver(schema)
    })
    const { handleSubmit } = form

    const onSubmit = async (formData) => {
        transition(() => setLoading(true))
        if (sourceRef.current) {
            sourceRef.current.abort()
        }
        const abortController = new AbortController()
        sourceRef.current = abortController
        try {
            const response = await axios.post('/auth/register',
                JSON.stringify(formData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    validateStatus: (status) => status < 500
                })

            if (response.status === 409) {
                setLoading(false)
                toast({
                    variant: 'destructive',
                    title: 'Пользователь с таким логином/почтой уже существует',
                })
            }
            if (response.status === 200) {
                toast({
                    title: 'Регистрация успешна',
                    description: 'Теперь можно войти в аккаунт',
                })
                navigate('/login', options)

            }
        } catch (err) {
            setLoading(false)
            toast({
                variant: 'destructive',
                title: 'Что-то пошло не так...',
                description: 'Возникла проблема с запросом, попробуйте позже',
            })
        }
    }

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus()
    }, [])

    return (
        <div className="flex h-5/6 items-center justify-center">
            <Card className="sm:w-[300px] md:w-[400px]">
                <CardHeader>
                    <CardTitle>Создать аккаунт</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4" noValidate>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Логин</FormLabel>
                                        <FormControl>
                                            <Input placeholder="goodPerson21" {...field} ref={inputRef} />
                                        </FormControl>
                                        <FormDescription>
                                            От 3 до 16 символов
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="example@mail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Пароль</FormLabel>
                                        <div className="flex relative items-center justify-end">
                                            <FormControl>
                                                <Input type={isPassVisible ? 'text' : 'password'} placeholder="notWeakPass141!" {...field} />
                                            </FormControl>
                                            <div className="flex absolute mr-3 cursor-pointer" onClick={togglePassVisibility} >
                                                {
                                                    isPassVisible ? <EyeFilledIcon className='text-2xl' /> :
                                                        <EyeSlashFilledIcon className='text-2xl' />
                                                }
                                            </div>
                                        </div>
                                        <FormDescription>
                                            От 6 до 32 символов
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passwordConfirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Подтверждение пароля</FormLabel>
                                        <FormControl>
                                            <Input type={isPassVisible ? 'text' : 'password'} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-y-4 items-start">
                                <ViewTransitionLink to='/login' options={options}>
                                    <span className="text-sm text-primary font-medium underline-offset-4 hover:underline">Уже есть аккаунт?</span>
                                </ViewTransitionLink>
                                <Button disabled={isLoading} type='submit'>
                                    {isLoading ? (
                                        <>
                                            <LoaderIcon className="text-primary-foreground animate-spin mr-3"></LoaderIcon>
                                            Подождите
                                        </>
                                    ) :
                                        'Создать аккаунт'
                                    }</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div>
    )
}
export default SignUp