const RestTitle = ({ name }: { name:string }) => {
    return (  
        <div className="border-b-grey pTB-24">
            <h3 className="capitalize">{name}</h3>
        </div>
    );
}
 
export default RestTitle;