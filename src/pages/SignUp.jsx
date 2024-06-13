import axios from "@/api/axios"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import errorToast from "@/lib/errorToast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { z } from "zod"

const schema = z.object({
    username: z.string().trim().min(3, 'Required length from 3 to 16 characters').max(16, 'Required length from 3 to 16 characters'),
    email: z.string().email('Incorrect e-mail format'),
    password: z.string().trim().min(6, 'At least 6 characters').max(32, 'At most 32 characters'),
    passwordConfirmation: z.string()
}).refine(
    (values) => values.password === values.passwordConfirmation,
    {
        message: "Passwords do not match",
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
                    title: 'Username/e-mail already taken',
                })
            }
            if (response.status === 200) {
                toast({
                    title: 'Signup success',
                    description: 'Now you can sign in to your account',
                })
                navigate('/login', options)

            }
        } catch (err) {
            setLoading(false)
            errorToast()
        }
    }

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus()
    }, [])

    return (
        <div className="flex items-center justify-center">
            <Card className="sm:w-[400px]">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4" noValidate>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="goodPerson21" {...field} ref={inputRef} />
                                        </FormControl>
                                        <FormDescription>
                                            3 to 16 characters
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
                                        <FormLabel>Password</FormLabel>
                                        <div className="flex relative items-center justify-end">
                                            <FormControl>
                                                <Input type={isPassVisible ? 'text' : 'password'} placeholder="notWeakPass141!" {...field} />
                                            </FormControl>
                                            <div className="flex absolute mr-3 cursor-pointer" onClick={togglePassVisibility} >
                                                {
                                                    isPassVisible ? <EyeIcon className='text-2xl' /> :
                                                        <EyeOffIcon className='text-2xl' />
                                                }
                                            </div>
                                        </div>
                                        <FormDescription>
                                            6 to 32 characters
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
                                        <FormLabel>Password confirmation</FormLabel>
                                        <FormControl>
                                            <Input type={isPassVisible ? 'text' : 'password'} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-y-4 items-start">
                                <ViewTransitionLink to='/login' options={options}>
                                    <span className="text-sm text-primary font-medium underline-offset-4 hover:underline">Already have an account?</span>
                                </ViewTransitionLink>
                                <Button isLoading={isLoading} type='submit'>
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div>
    )
}
export default SignUp