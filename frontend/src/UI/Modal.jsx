import Swal from "sweetalert2";

export default function showAlert(message, icon) {
  Swal.fire({
    icon: icon,
    title: icon === "error" ? "Oops..." : "Success!",
    text: message,
  });
}
