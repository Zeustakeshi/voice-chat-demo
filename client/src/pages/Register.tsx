import axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/Button";
import { setUser } from "../redux/slices/appSlice";

type Inputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Đăng ký";
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.confirmPassword.trim() !== data.password.trim()) {
            toast.error("Mật khẩu không trùng khớp");
            return;
        }
        await toast.promise(
            async () => {
                const res = await axios({
                    method: "POST",
                    url: `${import.meta.env.VITE_SERVER_URL}/user/register`,
                    data: {
                        email: data.email,
                        password: data.password,
                        username: data.username,
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
                success: "Đăng ký thành công",
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
                    {...register("username", {
                        required: true,
                        maxLength: 20,
                        minLength: 5,
                    })}
                    type="text"
                    placeholder="Tên đăng nhập"
                    className={`${
                        errors.username
                            ? "border-red-500 border-2 outline-none"
                            : "outline-sky-500 border border-gray-200"
                    } w-full px-5 py-3 rounded-sm  `}
                />

                <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Email"
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
                />
                <input
                    {...register("confirmPassword", {
                        required: true,
                        minLength: 6,
                    })}
                    type="password"
                    placeholder="Nhập Lại Mật Khẩu"
                    className={`${
                        errors.confirmPassword
                            ? "border-red-500 border-2 outline-none"
                            : "outline-sky-500 border border-gray-200"
                    } w-full px-5 py-3 rounded-sm  `}
                />
                <div className="flex w-full justify-center">
                    <h4 className="inline-block text-right text-sm text-slate-600">
                        Bạn đã là thành viên{" "}
                        <Link
                            to="/auth/login"
                            className="font-semibold text-sky-500"
                        >
                            Đăng Nhập{" "}
                        </Link>
                    </h4>
                </div>
                <Button className="w-full px-5 py-3 rounded-md text-white font-semibold bg-sky-500">
                    Đăng Ký
                </Button>
            </form>
        </div>
    );
};

export default Register;
