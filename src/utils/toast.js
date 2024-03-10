/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
import { toast } from "react-toastify";

export const toastHandel = (toastId, msg, code) => {
    if (code === 200) {
        toast.update(toastId, { render: msg, type: "success", isLoading: false });
        setTimeout(() => {
            toast.dismiss(toastId)
        }, 5000);
        return 1;
    } else {
        toast.update(toastId, { render: "some thing went wrong", type: "error", isLoading: false });
        setTimeout(() => {
            toast.dismiss(toastId)
        }, 5000);
        return 0;
    }
}