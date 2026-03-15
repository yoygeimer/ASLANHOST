// Reglas de cálculo:
// 8 personas base, 4GB RAM base
// Bedrock: x1 (8 personas/4GB), 3 complementos/GB
// Java: x2 (16 personas/4GB), 5 complementos/GB
// Hytale: x0.5 (4 personas/4GB), 5 complementos/GB

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector("button");
  btn.addEventListener("click", calcularRecursos);
});

function calcularRecursos() {
  const juego = document.getElementById("juego").value;
  const personas = parseInt(document.getElementById("personas").value);
  let multiplicador, complementosPorGB;

  if (isNaN(personas) || personas <= 0) {
    alert("Por favor, ingresa un número válido de personas.");
    return;
  }

  switch (juego) {
    case "Bedrock":
      multiplicador = 0.85;
      complementosPorGB = 3;
      break;
    case "Java":
      multiplicador = 1.5;
      complementosPorGB = 5;
      break;
    case "Hytale":
      multiplicador = 0.4;
      complementosPorGB = 5;
      break;
    default:
      multiplicador = 1;
      complementosPorGB = 3;
  }

  // Personas soportadas por 4GB
  const basePersonas = 8 * multiplicador;
  // RAM mínima necesaria
  let ramMin = Math.ceil((personas / basePersonas) * 4);
  if (ramMin < 4) ramMin = 4;

  // Complementos máximos
  const complementosMax = ramMin * complementosPorGB;

  //Recomendacion de compra
  //Bedrock Links:
  const bedrockLinks = [
    {
      ram: 4,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-cachorro",
    },
    {
      ram: 6,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-lion-core",
    },
    {
      ram: 8,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-lion-byte",
    },
    {
      ram: 10,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-lion-lite",
    },
    {
      ram: 14,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-lion-smart",
    },
    {
      ram: 16,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-lion-plus",
    },
    {
      ram: 18,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-lion-pro",
    },
    {
      ram: 24,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-cyber-lion-v1",
    },
    {
      ram: 26,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-lion-king",
    },
    {
      ram: 28,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/plan-lion-vip",
    },
    {
      ram: 32,
      link: "https://billing.aslanhost.com/products/minecraft-bedrock/Plan%20Lion%20Elite",
    },
  ];
  //Java Links:
  //Hytale Links:
  //Custom Server:
  const contacto =
    "https://wa.me/50767192971?text=Hola%2C%20vengo%20de%20la%20web%20de%20AslanHost%20quisiera%20un%20server%20custom%20de%20"+ramMin+"%20de%20ram";

  // Mostrar resultados
  const ramResult = document.getElementById("ram-result");
  const complementosResult = document.getElementById("complementos-result");
  const atlasResult = document.getElementById("atlas-result");

  // Lógica de recomendación de enlaces solo para Bedrock (puedes expandir para Java/Hytale)
  let recomendacionHTML = "";
  if (juego === "Bedrock") {
    // Buscar el enlace igual o el anterior más cercano
    let normal = null;
    let optima = null;
    for (let i = 0; i < bedrockLinks.length; i++) {
      if (bedrockLinks[i].ram >= ramMin) {
        optima = bedrockLinks[i];
        if (i > 0) {
          normal =
            bedrockLinks[i - 1].ram >= ramMin
              ? bedrockLinks[i - 1]
              : bedrockLinks[i - 1];
        } else {
          normal = bedrockLinks[i];
        }
        break;
      }
      normal = bedrockLinks[i];
    }
    // Si la RAM mínima es mayor que cualquier plan, recomendar custom
    if (!optima) {
      recomendacionHTML = `<span style='color:#2980b9;font-weight:bold;'>No hay plan estándar suficiente. </span><a href='${contacto}' target='_blank' style='color:#27ae60;font-weight:bold;'>¡Solicita un servidor personalizado aquí!</a>`;
    } else {
      // Mostrar normal (azul) y optima (verde)
      recomendacionHTML = `<a href='${normal.link}' target='_blank' style='color:#2980b9;font-weight:bold;text-decoration:none;'>Mejor precio: ${normal.ram}GB</a> &nbsp;|&nbsp; <a href='${optima.link}' target='_blank' style='color:#27ae60;font-weight:bold;text-decoration:none;'>Mejor elección: ${optima.ram}GB</a>`;
    }
  } else {
    if (juego === "Java") {
        recomendacionHTML = `<span style='color:#2980b9;'>Consulta opciones para ${juego}.</span> <a href="https://billing.aslanhost.com/products/minecraft-java">Ver servers de ${juego}</a>`;
    }
    else {
        recomendacionHTML = `<span style='color:#2980b9;'>Consulta opciones para ${juego}.</span> <a href="https://billing.aslanhost.com/products/hytale">Ver servers de ${juego}</a>`;
    }
  }

  if (ramResult && complementosResult && atlasResult) {
    ramResult.textContent = `La cantidad de ram mínima recomendada para tu servidor es: ${ramMin} GB`;
    complementosResult.textContent = `La cantidad máxima de complementos recomendada para tu servidor es: ${complementosMax}`;
    atlasResult.innerHTML = `Recomendación de Servidores Aslan (presione): <br>${recomendacionHTML}`;
  }
}
