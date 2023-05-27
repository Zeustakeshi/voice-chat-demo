import axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/Button";
import { setUser } from "../redux/slices/appSlice";

type Inputs = {
    email: string;
    password: string;
};

const Login = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "Đăng nhập";
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await toast.promise(
            async () => {
                const res = await axios({
                    method: "POST",
                    url: `${import.meta.env.VITE_SERVER_URL}/user/login`,
                    data: {
                        email: data.email,
                        password: data.password,
                    },
                });
                dispatch(setUser(res.data.user));

                localStorage.setItem(
                    "access_token",
                    JSON.stringify(res.data.access_token)
                );

                localStorage.setItem(
                    "current-user",
                    JSON.stringify(res.data.user)
                );

                navigation("/");
            },
            {
                pending: "Vui lòng đợi",
                success: "Đăng nhập thành công",
                error: "Đã có lỗi xảy ra, vui lòng thử lại",
            }
        );
    };

    return (
        <div className="flex w-full flex-col gap-5 justify-start items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-start items-start gap-5 w-full"
            >
                <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="email"
                    className={`${
                        errors.email
                            ? "border-red-500 border-2 outline-none"
                            : "outline-sky-500 border border-gray-200"
                    } w-full px-5 py-3 rounded-sm  `}
                />
                <input
                    {...register("password", { required: true, minLength: 6 })}
                    type="password"
                    placeholder="Mật Khẩu"
                    className={`${
                        errors.password
                            ? "border-red-500 border-2 outline-none"
                            : "outline-sky-500 border border-gray-200"
                    } w-full px-5 py-3 rounded-sm  `}
                />{" "}
                <div className="flex justify-center w-full">
                    <h4 className="text-right text-sm text-slate-600">
                        Bạn chưa có tài khoản?{" "}
                        <Link
                            to="/auth/register"
                            className="font-semibold text-sky-500"
                        >
                            Đăng ký{" "}
                        </Link>
                    </h4>
                </div>
                <Button className="w-full px-5 py-3 rounded-md text-white font-semibold bg-sky-500">
                    Đăng Nhập
                </Button>
            </form>
        </div>
    );
};

export default Login;
