import Swal from "sweetalert2";

const showAlert = (message, icon) => {
  Swal.fire({
    icon: icon,
    title: icon === "error" ? "Oops..." : "Success!",
    text: message,
  });
};

export default showAlert;
