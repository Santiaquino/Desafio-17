const sentProduct = async (id) => {

  fetch(`/api/carts/642c425d292a6ddf2ca5eef3/products/${id}`, {
    method: 'POST',
    body: '',
    headers: { 'Content-Type': 'application/json' }
  })

  Swal.fire({
    toast: true,
    text: 'Producto agregado',
    position: 'top-right',
    showConfirmButton: false,
    timer: 2500
  })
};
