import { toast } from "@/components/ui/use-toast"

export default function errorToast() {
    toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'There was a problem with request, try again later',
    })
} 