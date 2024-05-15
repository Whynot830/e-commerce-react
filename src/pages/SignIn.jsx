import { EyeFilledIcon } from "../components/ui/EyeFilledIcon"
import { EyeSlashFilledIcon } from "../components/ui/EyeSlashFilledIcon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from "react"
import transition from "@/lib/transition"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "lucide-react"
import { CanceledError } from "axios"
import { useToast } from "../components/ui/use-toast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import useAuth from "@/lib/hooks/useAuth"
import { useLocation } from "react-router-dom"
import axios from "@/api/axios"
import { Checkbox } from "@/components/ui/checkbox"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import useRefresh from "@/lib/hooks/useRefresh"
import { flushSync } from "react-dom"

const schema = z.object({
    username: z.string().trim().min(1, ''),
    password: z.string().trim().min(1, '')
})

const SignIn = () => {
    const { toast } = useToast()
    const { setAuth, persist, setPersist } = useAuth()
    const navigate = useViewNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const options = { state: (from === '/') ? null : { from: location.state.from } }
    const refresh = useRefresh()

    const sourceRef = useRef(null)
    const inputRef = useRef(null)

    const [isLoading, setLoading] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const togglePassVisibility = () => transition(() => setIsPassVisible(prev => !prev))
    const togglePersist = () => transition(() => setPersist(prev => !prev))

    const form = useForm({
        defaultValues: {
            username: '',
            password: ''
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
            const response = await axios.post('/auth/login',
                JSON.stringify(formData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                    validateStatus: (status) => status < 500 && status != 403,
                    signal: abortController.signal
                })
            if (response.status === 401) {
                transition(() => {
                    flushSync(() => {
                        setLoading(false)
                        toast({
                            variant: 'destructive',
                            title: 'Неправильные реквизиты'
                        })
                    })
                })
            }
            else if (response.status === 200) {
                setAuth({ user: response.data })
                navigate(from, { replace: true })
            }
        } catch (err) {
            if (err instanceof CanceledError)
                return
            transition(() => {
                flushSync(() => {
                    setLoading(false)
                    toast({
                        variant: 'destructive',
                        title: 'Что-то пошло не так...',
                        description: 'Возникла проблема с запросом, попробуйте позже',
                    })
                })
            })
        }
    }

    useEffect(() => {
        localStorage.setItem("persist", persist)
    }, [persist])

    useEffect(() => {

        refresh().then((response) => {
            if (response) navigate(from, options)
        })

        if (inputRef.current)
            inputRef.current.focus()
        return () => {
            if (sourceRef.current)
                sourceRef.current.abort()
        }
    }, [])

    return (
        <div className="flex h-3/4 items-center justify-center">
            <Card className="md:w-[400px]">
                <CardHeader>
                    <CardTitle>Войти в аккаунт</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4" noValidate>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Логин/E-mail</FormLabel>
                                        <FormControl>
                                            <Input {...field} ref={inputRef} />
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
                                                <Input type={isPassVisible ? 'text' : 'password'} {...field} />
                                            </FormControl>
                                            <div className="flex absolute mr-3 cursor-pointer" onClick={togglePassVisibility} >
                                                {
                                                    isPassVisible ? <EyeFilledIcon className='text-2xl' /> :
                                                        <EyeSlashFilledIcon className='text-2xl' />
                                                }
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-y-4 items-start">
                                <ViewTransitionLink to='/signup' options={options}>
                                    <span className="text-sm text-primary font-medium underline-offset-4 hover:underline">Создать аккаунт</span>
                                </ViewTransitionLink>
                                <div className="flex items-center gap-x-3 my-3">
                                    <Checkbox id="persist" onCheckedChange={togglePersist} checked={persist} />
                                    <label htmlFor="persist" className="cursor-pointer leading-none text-sm font-medium text-primary">Доверять этому устройству</label>
                                </div>
                                <Button disabled={isLoading} type='submit'>
                                    {isLoading ? (
                                        <>
                                            <LoaderIcon className="animate-spin mr-3"></LoaderIcon>
                                            Подождите
                                        </>
                                    ) :
                                        'Войти'
                                    }</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div>


    )
}
export default SignIn