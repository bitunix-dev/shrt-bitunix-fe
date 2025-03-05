interface ModalBodyProps {
    children: React.ReactNode
}

export const ModalBody:React.FC<ModalBodyProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    )
}