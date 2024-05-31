import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch());

  return (
    <div className="surface-ground box-center min-h-screen min-w-screen overflow-hidden ">
      <div className="box-center flex-col">
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-20 px-8 sm:px-20"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-8">
              <div className="text-gray-900 text-3xl font-bold mb-3">
                WELCOME!
              </div>
              <span className="text-gray-500 font-medium">
                Sign in to continue
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  className="w-full md:w-64 outline-none"
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    maxLength: 80,
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  })}
                />
                {errors.email && <span>This field is required</span>}
              </div>

              <div className="mb-4">
                <input
                  className="w-full outline-none"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}
              </div>

              <input type="submit" />
            </form>

            <div className="mt-6 text-center">
              Don't have an account? <Link to="/auth/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
