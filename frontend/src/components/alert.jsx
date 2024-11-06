export function AlertDanger({children, onClose}) {
    return (
        <div className={`alert alert-danger alert-dismissible`} role="alert">
            {children}
            <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
    )
}

export function AlertSuccess({children, onClose}) {
    return (
        <div className="alert alert-success alert-dismissible" role="alert">
            {children}
            <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
    )
}