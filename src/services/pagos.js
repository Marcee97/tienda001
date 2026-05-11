 const generarPago = async () => {
    const res = await fetch(
      "http://localhost:3000/api/pagos/crear-preferencia",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoSeleccionado),
      },
    );
    const data = await res.json();
    console.log("se ejecuta funcion de pagos", data);
    // window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`
    console.log(
      `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`,
    );
  };