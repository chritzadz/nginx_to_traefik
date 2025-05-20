const form = document.getElementById("auth-test");
    const input = document.getElementById("input");
    const responseBox = document.getElementById("response");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const res = await fetch("/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Pretest": input.value
          },
          body: JSON.stringify({ message: "from web form" })
        });

        const data = await res.text(); 
        responseBox.textContent = data;
      } catch (err) {
        // ignore
      }
    });