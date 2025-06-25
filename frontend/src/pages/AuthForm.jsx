import { Link } from "react-router-dom";

const AuthForm = ({ mode = "signup" }) => {
  const isSignup = mode === "signup";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Just log the data for now (no backend logic)
    const form = e.target;
    const formData = {
      name: form.name?.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword?.value,
    };

    console.log(`${isSignup ? 'Signup' : 'Login'} form submitted:`, formData);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <img
        src="https://i.pinimg.com/736x/6a/3a/e8/6a3ae8c78942412a016c99d4704680ca.jpg"
        alt=""
        className="h-140 w-full object-cover"
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">
          {isSignup ? "Create an Account" : "Log In"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full px-8">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-b-2 border-gray-400 w-full p-3"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-b-2 border-gray-400 w-full p-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-b-2 border-gray-400 w-full p-3"
            required
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border-b-2 border-gray-400 w-full p-3"
            />
          )}

          <button type="submit" className="bg-[#DB4444] text-white w-full py-3">
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <p className="text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link to={isSignup ? "/login" : "/signup"} className="text-blue-500 underline">
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
