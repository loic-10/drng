import Swal from "sweetalert2";

export default function CustomConfirm(
  onConfirm: any,
  title: string = "Are you sure?",
  confirmButtonText: string = "Delete"
) {
  Swal.fire({
    title,
    confirmButtonText,
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      onConfirm();
    }
  });
}
