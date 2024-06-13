import axios from "@/api/axios"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import errorToast from "@/lib/errorToast"
import useAuth from "@/lib/hooks/useAuth"
import useRefresh from "@/lib/hooks/useRefresh"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { zodResolver } from '@hookform/resolvers/zod'
import { CanceledError } from "axios"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { z } from "zod"
import { useToast } from "../components/ui/use-toast"

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
    const togglePersist = () => setPersist(prev => !prev)

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
                            title: 'Bad credentials'
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
                    errorToast()
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
            <Card className="sm:w-[400px]">
                <CardHeader>
                    <CardTitle>Sign in to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4" noValidate>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username/E-mail</FormLabel>
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
                                        <FormLabel>Password</FormLabel>
                                        <div className="flex relative items-center justify-end">
                                            <FormControl>
                                                <Input type={isPassVisible ? 'text' : 'password'} {...field} />
                                            </FormControl>
                                            <div className="flex absolute mr-3 cursor-pointer" onClick={togglePassVisibility} >
                                                {
                                                    isPassVisible ? <EyeIcon className='text-2xl' /> :
                                                        <EyeOffIcon className='text-2xl' />
                                                }
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-y-4 items-start">
                                <ViewTransitionLink to='/signup' options={options}>
                                    <span className="text-sm text-primary font-medium underline-offset-4 hover:underline ">Do not have an account yet?</span>
                                </ViewTransitionLink>
                                <div className="flex items-center gap-x-3 my-3">
                                    <Checkbox id="persist" onCheckedChange={togglePersist} checked={persist} />
                                    <label htmlFor="persist" className="cursor-pointer leading-none text-sm font-medium text-foreground">Trust this device</label>
                                </div>
                                <Button isLoading={isLoading} type='submit'>
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card >
        </div>


    )
}
export default SignIn