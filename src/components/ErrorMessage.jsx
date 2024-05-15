const ErrorMessage = ({ error }) => {
    return (
        <>
            {error && <p className='text-destructive'>{error.message}</p>}
        </>
    )
}
export default ErrorMessage