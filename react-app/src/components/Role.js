

const Role = ({currentUser},{users},{isPending},[allowedRoles])=>{

  
 if (isPending){
     return false;
  
 }
 else { 
     
    let type = users.find((user) => user.id === currentUser.uid).type;
    if (allowedRoles.includes(type)){
    return true;

    }
    return false;

}
};

   export default Role;