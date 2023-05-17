const button = document.getElementById('buttonCompra');

button.addEventListener('click', (e) => {
  e.preventDefault();

  fetch(`/api/carts/642f2e5c17fc9ced3300d197/purchase`, {
    method: 'POST',
    body: '',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => result.json())
  .then(json => {
    if (json.error) {
      Swal.fire({
        title: `${json.status}`,
        icon: 'error',
        text: `${json.error}`
      })
    }
    else {
      Swal.fire({
        toast: true,
        text: 'Carrito con productos comprados',
        position: 'top-right',
        showConfirmButton: false,
        timer: 2500
      })
    }
  })
})
