const RestLayout = ({ children } : { children: React.ReactNode }) => {
    return (  
        <section className="page bg-col-fff">
            {children}
        </section>
    )
}
 
export default RestLayout;