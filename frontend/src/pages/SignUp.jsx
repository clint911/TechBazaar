const SignUp = () =>{
  return (
   <div>
    <div>
      <img src="https://i.pinimg.com/736x/6a/3a/e8/6a3ae8c78942412a016c99d4704680ca.jpg" alt="My image" />
     <div>
      <h1> Create an account here </h1>
       <form className="flex flex-col">
        <input type="text" placeholder="Name"/>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />        
      </form>    
     </div>  
    </div>  
   </div>
 )
}

export default SignUp;
