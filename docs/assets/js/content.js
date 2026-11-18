/* =====================================================================
   CONTINGUT DEL PORTFOLIO DE MIQUEL MOLINA PEDRERO
   ---------------------------------------------------------------------
   - Qualsevol text pot ser:
       "Text igual en tots els idiomes"
       { ca: "Text en català", es: "Texto en español", en: "Text in English" }
   - Dates en format "AAAA-MM". end: null → "Ara / Actualidad / Present"
   - Busca "TODO" per veure el que cal revisar (p.ex. la foto)
   ===================================================================== */

window.CONTENT = {
  /* ---------- Dades personals ---------- */
  profile: {
    name: "Miquel Molina Pedrero",
    role: { ca: "Administrador de Sistemes", es: "Administrador de Sistemas", en: "Systems Administrator" },
    location: "Barcelona",
    email: "miquelmolinape@gmail.com",
    linkedin: "https://www.linkedin.com/in/miquel-molina-pedrero-b38588312/",
    github: "https://github.com/miquel-molina",
    linkedinLabel: "linkedin.com/in/miquel-molina-pedrero",
    photo: "assets/img/miquel.jpg",
    cv: {
      ca: "assets/CV-Miquel-Molina-CA.pdf",
      es: "assets/CV-Miquel-Molina-ES.pdf",
      en: "assets/CV-Miquel-Molina-EN.pdf",
    },
  },

  /* ---------- Hero ---------- */
  hero: {
    status: {
      ca: "Fent pràctiques a PUE Barcelona",
      es: "En prácticas en PUE Barcelona",
      en: "Interning at PUE Barcelona",
    },
    firstName: "Miquel",
    lastName: "Molina",
    tagline: {
      ca: "Estudiant de CFGS ASIX i tècnic de pràctiques en IT Support i administració de sistemes. M'interessen les xarxes, el núvol i Linux.",
      es: "Estudiante de CFGS ASIX y técnico en prácticas de IT Support y administración de sistemas. Me interesan las redes, la nube y Linux.",
      en: "CFGS ASIX student and IT Support & sysadmin intern. Passionate about networking, cloud, and Linux.",
    },
    roles: [
      { ca: "Estudiant CFGS ASIX", es: "Estudiante CFGS ASIX", en: "CFGS ASIX Student" },
      { ca: "IT Support & Sysadmin", es: "IT Support & Sysadmin", en: "IT Support & Sysadmin" },
      { ca: "Kubernetes · AWS · Linux", es: "Kubernetes · AWS · Linux", en: "Kubernetes · AWS · Linux" },
      { ca: "Xarxes i sistemes", es: "Redes y sistemas", en: "Networking & systems" },
    ],
    stats: [
      { value: 5, suffix: "", label: { ca: "projectes destacats", es: "proyectos destacados", en: "featured projects" } },
      { value: 2, suffix: "", label: { ca: "cursos d'ASIX", es: "cursos de ASIX", en: "ASIX school years" } },
    ],
    // Cinta de tecnologies — els noms han d'existir a LOGOS de main.js
    mainStack: ["Linux", "Kubernetes", "AWS", "Docker", "PostgreSQL", "Cisco", "VirtualBox", "Windows", "Git", "Jira"],
  },

  /* ---------- Sobre mi ---------- */
  about: {
    paragraphs: [
      {
        ca: "Soc estudiant de segon any de CFGS ASIX a l'ITIC Barcelona, i treballo en pràctiques a PUE Barcelona com a IT Support i administrador de sistemes.",
        es: "Soy estudiante de segundo año de CFGS ASIX en el ITIC Barcelona, y trabajo en prácticas en PUE Barcelona como IT Support y administrador de sistemas.",
        en: "I'm a second-year CFGS ASIX student at ITIC Barcelona, currently doing an internship at PUE Barcelona as IT Support and systems administrator.",
      },
      {
        ca: "M'interessen les xarxes, la virtualització i el núvol. Ara estic començant a treballar amb Kubernetes i AWS a l'empresa, i vull seguir aprenent.",
        es: "Me interesan las redes, la virtualización y la nube. Ahora estoy empezando a trabajar con Kubernetes y AWS en la empresa, y quiero seguir aprendiendo.",
        en: "I enjoy networking, virtualisation, and cloud environments. I'm now starting to work with Kubernetes and AWS at the company, and I want to keep learning.",
      },
    ],
    // Tercer paràgraf: més personal (surt al CV)
    extra: {
      ca: "Fora de l'ordinador, practico l'hoquei patins des dels 3 anys al Club Patí Sant Celoni, on soc jugador del primer equip (Nacional Catalana). També m'agrada sortir a córrer i anar amb bici.",
      es: "Fuera del ordenador, practico el hockey patines desde los 3 años en el Club Patí Sant Celoni, donde soy jugador del primer equipo (Nacional Catalana). También me gusta correr e ir en bici.",
      en: "Away from the computer, I've played roller hockey since I was 3 at Club Patí Sant Celoni, where I play for the first team (Catalan National league). I also enjoy running and cycling.",
    },
    highlights: [
      {
        icon: "server",
        title: { ca: "Sistemes Linux", es: "Sistemas Linux", en: "Linux Systems" },
        text: { ca: "Administració d'Ubuntu i serveis, tant a classe com als projectes.", es: "Administración de Ubuntu y servicios, tanto en clase como en los proyectos.", en: "Ubuntu and service administration, both in class and in my projects." },
      },
      {
        icon: "flow",
        title: { ca: "Núvol i contenidors", es: "Nube y contenedores", en: "Cloud & containers" },
        text: { ca: "AWS a classe i Kubernetes a les pràctiques a l'empresa.", es: "AWS en clase y Kubernetes en las prácticas en la empresa.", en: "AWS at school and Kubernetes during my internship." },
      },
      {
        icon: "check",
        title: { ca: "Xarxes i routing", es: "Redes y routing", en: "Networking & routing" },
        text: { ca: "Routers Cisco, encaminament estàtic, SSH i ACLs.", es: "Routers Cisco, enrutamiento estático, SSH y ACLs.", en: "Cisco routers, static routing, SSH and ACLs." },
      },
      {
        icon: "chat",
        title: { ca: "Suport IT", es: "Soporte IT", en: "IT Support" },
        text: { ca: "Atenció a usuaris i gestió d'incidències amb tickets.", es: "Atención a usuarios y gestión de incidencias con tickets.", en: "User support and incident handling through tickets." },
      },
    ],
    journey: [
      {
        years: { ca: "2026 – ara", es: "2026 – actualidad", en: "2026 – present" },
        now: true,
        title: { ca: "Pràctiques a PUE Barcelona", es: "Prácticas en PUE Barcelona", en: "Internship at PUE Barcelona" },
        text: { ca: "IT Support i administrador de sistemes. Tickets, AWS i clústers de Kubernetes.", es: "IT Support y administrador de sistemas. Tickets, AWS y clústeres de Kubernetes.", en: "IT Support and systems administrator. Tickets, AWS and Kubernetes clusters." },
      },
      {
        years: "2026 – 2027",
        now: true,
        title: { ca: "2n curs CFGS ASIX · ITIC Barcelona", es: "2.º curso CFGS ASIX · ITIC Barcelona", en: "2nd year CFGS ASIX · ITIC Barcelona" },
        text: { ca: "Segon any del cicle, combinant classes i pràctiques.", es: "Segundo año del ciclo, combinando clases y prácticas.", en: "Second year of the programme, combining classes and the internship." },
      },
      {
        years: "2025 – 2026",
        title: { ca: "1r curs CFGS ASIX · ITIC Barcelona", es: "1.er curso CFGS ASIX · ITIC Barcelona", en: "1st year CFGS ASIX · ITIC Barcelona" },
        text: { ca: "Xarxes, Linux, bases de dades i primers projectes.", es: "Redes, Linux, bases de datos y primeros proyectos.", en: "Networking, Linux, databases and my first projects." },
      },
    ],
    facts: [
      { icon: "pin", text: { ca: "Barcelona", es: "Barcelona", en: "Barcelona" } },
      { icon: "globe", text: { ca: "Català i castellà (natius) · Anglès B2", es: "Catalán y castellano (nativos) · Inglés B2", en: "Catalan and Spanish (native) · English B2" } },
      { icon: "cap", text: { ca: "CFGS ASIX · 2n curs", es: "CFGS ASIX · 2.º curso", en: "CFGS ASIX · 2nd year" } },
    ],
  },

  /* ---------- Experiència ---------- */
  experience: [
    {
      company: "PUE Barcelona",
      role: { ca: "IT Support & Administrador de Sistemes", es: "IT Support & Administrador de Sistemas", en: "IT Support & Systems Administrator" },
      start: "2026-11",
      end: null,
      points: [
        { ca: "Atenció a usuaris i resolució d'incidències amb sistemes de ticketing (Jira, Zoho).", es: "Atención a usuarios y resolución de incidencias con sistemas de ticketing (Jira, Zoho).", en: "User support and incident resolution using ticketing systems (Jira, Zoho)." },
        { ca: "Revisió i manteniment de clústers de Kubernetes a AWS.", es: "Revisión y mantenimiento de clústeres de Kubernetes en AWS.", en: "Review and maintenance of Kubernetes clusters on AWS." },
        { ca: "Ús habitual de les plataformes internes de l'empresa, a més de Zoho i Jira.", es: "Uso habitual de las plataformas internas de la empresa, además de Zoho y Jira.", en: "Day-to-day use of the company's internal platforms, plus Zoho and Jira." },
        { ca: "Properament començaré a fer laboratoris guiats pel meu tutor de pràctiques.", es: "Próximamente empezaré a hacer laboratorios guiados por mi tutor de prácticas.", en: "Soon I'll start hands-on labs guided by my internship tutor." },
      ],
      tech: ["Windows", "AWS", "Kubernetes", "Jira"],
    },
  ],

  /* ---------- Projectes ---------- */
  projects: [
    {
      slug: "replicacio-postgresql",
      type: { ca: "Projecte de grup", es: "Proyecto de grupo", en: "Group project" },
      short: { ca: "Replicació PostgreSQL", es: "Replicación PostgreSQL", en: "PostgreSQL Replication" },
      title: { ca: "Replicació lògica amb pglogical", es: "Replicación lógica con pglogical", en: "Logical replication with pglogical" },
      description: {
        ca: "Configuració d'un clúster de tres nodes PostgreSQL 16 amb replicació lògica bidireccional usant l'extensió pglogical.",
        es: "Configuración de un clúster de tres nodos PostgreSQL 16 con replicación lógica bidireccional usando la extensión pglogical.",
        en: "Setup of a three-node PostgreSQL 16 cluster with bidirectional logical replication using the pglogical extension.",
      },
      cover: null,
      tech: ["PostgreSQL", "Linux"],
      info: {
        kind: { ca: "Pràctica de grup", es: "Práctica de grupo", en: "Group lab" },
        year: "2026",
        team: { ca: "Grup 8 (3 persones)", es: "Grupo 8 (3 personas)", en: "Group 8 (3 people)" },
        status: { ca: "Completat", es: "Completado", en: "Completed" },
      },
      intro: [
        { ca: "Pràctica de grup on vam desplegar tres nodes Ubuntu amb PostgreSQL 16 i vam configurar replicació lògica bidireccional amb pglogical.", es: "Práctica de grupo donde desplegamos tres nodos Ubuntu con PostgreSQL 16 y configuramos replicación lógica bidireccional con pglogical.", en: "Group lab where we deployed three Ubuntu nodes running PostgreSQL 16 and configured bidirectional logical replication with pglogical." },
        { ca: "Vam treballar la configuració de pg_hba.conf, la creació de nodes proveïdor i subscriptor, i la sincronització entre instàncies.", es: "Trabajamos la configuración de pg_hba.conf, la creación de nodos proveedor y suscriptor, y la sincronización entre instancias.", en: "We worked on pg_hba.conf configuration, provider and subscriber node creation, and cross-instance synchronisation." },
      ],
      features: [
        { ca: "Desplegament de tres nodes Ubuntu amb PostgreSQL 16", es: "Despliegue de tres nodos Ubuntu con PostgreSQL 16", en: "Deployment of three Ubuntu nodes running PostgreSQL 16" },
        { ca: "Configuració de replicació lògica bidireccional amb pglogical", es: "Configuración de replicación lógica bidireccional con pglogical", en: "Bidirectional logical replication setup with pglogical" },
        { ca: "Gestió de pg_hba.conf i permisos entre instàncies", es: "Gestión de pg_hba.conf y permisos entre instancias", en: "pg_hba.conf management and cross-instance permissions" },
        { ca: "Proves de sincronització i verificació de dades", es: "Pruebas de sincronización y verificación de datos", en: "Synchronisation tests and data verification" },
      ],
    },
    {
      slug: "postgresql-aws-rds",
      type: { ca: "Pràctica individual", es: "Práctica individual", en: "Individual lab" },
      short: { ca: "PostgreSQL a AWS RDS", es: "PostgreSQL en AWS RDS", en: "PostgreSQL on AWS RDS" },
      title: { ca: "PostgreSQL a AWS RDS sobre EC2", es: "PostgreSQL en AWS RDS sobre EC2", en: "PostgreSQL on AWS RDS with EC2" },
      description: {
        ca: "Desplegament d'una instància PostgreSQL 16 a AWS RDS connectada des d'una instància EC2 Ubuntu, amb accés gestionat per claus i grups de seguretat.",
        es: "Despliegue de una instancia PostgreSQL 16 en AWS RDS conectada desde una instancia EC2 Ubuntu, con acceso gestionado por claves y grupos de seguridad.",
        en: "Deployment of a PostgreSQL 16 instance on AWS RDS, accessed from an Ubuntu EC2 instance, with key-based access and security groups.",
      },
      cover: null,
      tech: ["PostgreSQL", "AWS", "Linux"],
      info: {
        kind: { ca: "Pràctica individual", es: "Práctica individual", en: "Individual lab" },
        year: "2026",
        team: { ca: "Individual", es: "Individual", en: "Individual" },
        status: { ca: "Completat", es: "Completado", en: "Completed" },
      },
      intro: [
        { ca: "Pràctica individual on vaig desplegar una instància RDS PostgreSQL 16 a AWS i hi vaig connectar una màquina EC2 amb Ubuntu.", es: "Práctica individual donde desplegué una instancia RDS PostgreSQL 16 en AWS y la conecté a una máquina EC2 con Ubuntu.", en: "Individual lab where I deployed a PostgreSQL 16 RDS instance on AWS and connected it from an Ubuntu EC2 machine." },
        { ca: "Vaig configurar els grups de seguretat, la connexió per clau SSH i la recuperació d'accés amb pg_hba.conf.", es: "Configuré los grupos de seguridad, la conexión por clave SSH y la recuperación de acceso con pg_hba.conf.", en: "I configured security groups, SSH key-based access, and pg_hba.conf-based access recovery." },
      ],
      features: [
        { ca: "Creació i configuració d'instàncies RDS i EC2 a AWS", es: "Creación y configuración de instancias RDS y EC2 en AWS", en: "Creation and configuration of RDS and EC2 instances on AWS" },
        { ca: "Gestió de grups de seguretat i accés entre instàncies", es: "Gestión de grupos de seguridad y acceso entre instancias", en: "Security group and cross-instance access management" },
        { ca: "Recuperació d'accés a PostgreSQL via pg_hba.conf", es: "Recuperación de acceso a PostgreSQL vía pg_hba.conf", en: "PostgreSQL access recovery via pg_hba.conf" },
        { ca: "Connexió remota segura per SSH des d'Ubuntu EC2", es: "Conexión remota segura por SSH desde Ubuntu EC2", en: "Secure SSH remote connection from Ubuntu EC2" },
      ],
    },
    {
      slug: "routing-cisco",
      type: { ca: "Pràctica d'examen", es: "Práctica de examen", en: "Exam lab" },
      short: { ca: "Routing Cisco", es: "Routing Cisco", en: "Cisco Routing" },
      title: { ca: "Xarxa amb routers Cisco 1941", es: "Red con routers Cisco 1941", en: "Cisco 1941 Router Network" },
      description: {
        ca: "Configuració d'una xarxa de cinc routers Cisco 1941 a Packet Tracer amb encaminament estàtic, SSH i ACLs exteses amb nom.",
        es: "Configuración de una red de cinco routers Cisco 1941 en Packet Tracer con enrutamiento estático, SSH y ACLs extendidas con nombre.",
        en: "Configuration of a five-router Cisco 1941 network in Packet Tracer with static routing, SSH, and named extended ACLs.",
      },
      cover: null,
      tech: ["Cisco"],
      info: {
        kind: { ca: "Pràctica d'examen", es: "Práctica de examen", en: "Exam lab" },
        year: "2026",
        team: { ca: "Individual", es: "Individual", en: "Individual" },
        status: { ca: "Completat", es: "Completado", en: "Completed" },
      },
      intro: [
        { ca: "Exercici d'examen de xarxes on vaig dissenyar i configurar una topologia de cinc routers Cisco 1941 amb Packet Tracer.", es: "Ejercicio de examen de redes donde diseñé y configuré una topología de cinco routers Cisco 1941 con Packet Tracer.", en: "Networking exam exercise where I designed and configured a five-Cisco 1941-router topology in Packet Tracer." },
        { ca: "Vaig configurar encaminament estàtic complet, accés SSH i llistes de control d'accés exteses amb nom per filtrar el tràfic.", es: "Configuré enrutamiento estático completo, acceso SSH y listas de control de acceso extendidas con nombre para filtrar el tráfico.", en: "I configured full static routing, SSH access, and named extended ACLs to control traffic." },
      ],
      features: [
        { ca: "Topologia de 5 routers Cisco 1941 a Packet Tracer", es: "Topología de 5 routers Cisco 1941 en Packet Tracer", en: "Five-router Cisco 1941 topology in Packet Tracer" },
        { ca: "Encaminament estàtic entre totes les xarxes", es: "Enrutamiento estático entre todas las redes", en: "Full static routing between all networks" },
        { ca: "Configuració d'accés SSH als routers", es: "Configuración de acceso SSH a los routers", en: "SSH access configuration on all routers" },
        { ca: "ACLs exteses amb nom per controlar el tràfic", es: "ACLs extendidas con nombre para controlar el tráfico", en: "Named extended ACLs for traffic control" },
      ],
    },
    {
      slug: "ubuntu-24-04",
      type: { ca: "Informe tècnic", es: "Informe técnico", en: "Technical report" },
      short: { ca: "Ubuntu 24.04 LTS", es: "Ubuntu 24.04 LTS", en: "Ubuntu 24.04 LTS" },
      title: { ca: "Informe tècnic: Ubuntu 24.04 LTS", es: "Informe técnico: Ubuntu 24.04 LTS", en: "Technical report: Ubuntu 24.04 LTS" },
      description: {
        ca: "Informe tècnic sobre Ubuntu 24.04 LTS (Noble Numbat) per a l'administració de sistemes.",
        es: "Informe técnico sobre Ubuntu 24.04 LTS (Noble Numbat) para la administración de sistemas.",
        en: "Technical report on Ubuntu 24.04 LTS (Noble Numbat) for systems administration.",
      },
      cover: null,
      tech: ["Linux"],
      info: {
        kind: { ca: "Informe tècnic", es: "Informe técnico", en: "Technical report" },
        year: "2025",
        team: { ca: "Individual", es: "Individual", en: "Individual" },
        status: { ca: "Completat", es: "Completado", en: "Completed" },
      },
      intro: [
        { ca: "Informe tècnic sobre Ubuntu 24.04 LTS (Noble Numbat): què és una versió LTS, què aporta i com l'utilitzem a l'administració de sistemes.", es: "Informe técnico sobre Ubuntu 24.04 LTS (Noble Numbat): qué es una versión LTS, qué aporta y cómo la usamos en la administración de sistemas.", en: "Technical report on Ubuntu 24.04 LTS (Noble Numbat): what an LTS release is, what it brings and how it is used in systems administration." },
      ],
    },
    {
      slug: "aws-ec2",
      type: { ca: "Pràctica individual", es: "Práctica individual", en: "Individual lab" },
      short: { ca: "AWS EC2", es: "AWS EC2", en: "AWS EC2" },
      title: { ca: "Desplegament d'instàncies AWS EC2", es: "Despliegue de instancias AWS EC2", en: "AWS EC2 Instance Deployment" },
      description: {
        ca: "Creació i configuració d'instàncies EC2 a AWS amb Ubuntu, gestió de claus SSH, grups de seguretat i connexió remota.",
        es: "Creación y configuración de instancias EC2 en AWS con Ubuntu, gestión de claves SSH, grupos de seguridad y conexión remota.",
        en: "Creation and configuration of EC2 instances on AWS with Ubuntu, SSH key management, security groups, and remote access.",
      },
      cover: null,
      tech: ["AWS", "Linux"],
      info: {
        kind: { ca: "Pràctica individual", es: "Práctica individual", en: "Individual lab" },
        year: "2026",
        team: { ca: "Individual", es: "Individual", en: "Individual" },
        status: { ca: "Completat", es: "Completado", en: "Completed" },
      },
      intro: [
        { ca: "Pràctica on vaig crear i configurar instàncies EC2 a AWS amb Ubuntu, gestionant parells de claus SSH i grups de seguretat.", es: "Práctica donde creé y configuré instancias EC2 en AWS con Ubuntu, gestionando pares de claves SSH y grupos de seguridad.", en: "Lab where I created and configured EC2 instances on AWS with Ubuntu, managing SSH key pairs and security groups." },
      ],
      features: [
        { ca: "Creació d'instàncies EC2 amb Ubuntu a AWS", es: "Creación de instancias EC2 con Ubuntu en AWS", en: "EC2 instance creation with Ubuntu on AWS" },
        { ca: "Gestió de parells de claus SSH", es: "Gestión de pares de claves SSH", en: "SSH key pair management" },
        { ca: "Configuració de grups de seguretat i regles de xarxa", es: "Configuración de grupos de seguridad y reglas de red", en: "Security group and network rule configuration" },
        { ca: "Connexió remota segura i gestió de la instància", es: "Conexión remota segura y gestión de la instancia", en: "Secure remote connection and instance management" },
      ],
    },
  ],

  /* ---------- Stack tecnològic ---------- */
  stack: [
    { code: "SYS", group: { ca: "Sistemes operatius", es: "Sistemas operativos", en: "Operating systems" }, items: ["Linux", "Windows", "Windows Server"] },
    { code: "NET", group: { ca: "Xarxes", es: "Redes", en: "Networking" }, items: ["Cisco"] },
    { code: "VRT", group: { ca: "Virtualització", es: "Virtualización", en: "Virtualisation" }, items: ["VirtualBox", "Docker"] },
    { code: "CLD", group: { ca: "Núvol", es: "Nube", en: "Cloud" }, items: ["AWS", "Kubernetes"] },
    { code: "DB", group: { ca: "Bases de dades", es: "Bases de datos", en: "Databases" }, items: ["PostgreSQL"] },
    { code: "SUP", group: { ca: "Suport i eines", es: "Soporte y herramientas", en: "Support & tools" }, items: ["Jira", "Zoho", "Git"] },
    { code: "CAD", group: { ca: "Disseny tècnic", es: "Diseño técnico", en: "Technical design" }, items: ["AutoCAD", "Fusion 360"] },
  ],

  /* ---------- Formació ---------- */
  education: [
    {
      title: { ca: "CFGS ASIX — Administració de Sistemes Informàtics en Xarxa", es: "CFGS ASIX — Administración de Sistemas Informáticos en Red", en: "Higher Vocational in Network Systems Administration (CFGS ASIX)" },
      place: "ITIC Barcelona",
      start: "2025-09",
      end: null,
    },
  ],

  certifications: [],

  /* ---------- Interfície (no tocar si no saps JS) ---------- */
  ui: {
    skip: { ca: "Saltar al contingut", es: "Saltar al contenido", en: "Skip to content" },
    now: { ca: "Ara", es: "Ahora", en: "Now" },
    present: { ca: "Ara", es: "Actualidad", en: "Present" },
    current: { ca: "Actual", es: "Actual", en: "Current" },
    client: { ca: "Client", es: "Cliente", en: "Client" },
    stackLabel: { ca: "Tecnologies", es: "Tecnologías", en: "Technologies" },
    stackTitle: { ca: "Stack principal", es: "Stack principal", en: "Main stack" },
    stackNote: { ca: "Llista en expansió — aprenc noves eines a mesura que les necessito.", es: "Lista en expansión — aprendo nuevas herramientas a medida que las necesito.", en: "Growing list — I learn new tools as I need them." },
    eduDone: { ca: "Completat", es: "Completado", en: "Completed" },
    certLabel: { ca: "Certificació", es: "Certificación", en: "Certification" },
    ctaProjects: { ca: "Veure projectes", es: "Ver proyectos", en: "See projects" },
    ctaCv: { ca: "Descarregar CV", es: "Descargar CV", en: "Download CV" },
    ctaContact: { ca: "Contactar", es: "Contactar", en: "Get in touch" },
    ctaEmail: { ca: "Escriure un correu", es: "Escribir un correo", en: "Send an email" },
    contactText: {
      ca: "Estic obert a nous projectes, pràctiques i col·laboracions. Escriu-me i et respondré el més aviat possible.",
      es: "Estoy abierto a nuevos proyectos, prácticas y colaboraciones. Escríbeme y te responderé lo antes posible.",
      en: "Open to new projects, internships, and collaborations. Write me and I'll get back to you as soon as possible.",
    },
    cardRole: { ca: "IT Support & Sysadmin", es: "IT Support & Sysadmin", en: "IT Support & Sysadmin" },
    copy: { ca: "Copiar correu", es: "Copiar correo", en: "Copy email" },
    copied: { ca: "Copiat!", es: "¡Copiado!", en: "Copied!" },
    menu: { ca: "Menú", es: "Menú", en: "Menu" },
    langSwitch: { ca: "Canviar idioma", es: "Cambiar idioma", en: "Switch language" },
    themeToDark: { ca: "Mode fosc", es: "Modo oscuro", en: "Dark mode" },
    themeToLight: { ca: "Mode clar", es: "Modo claro", en: "Light mode" },
    backTop: { ca: "Tornar dalt", es: "Volver arriba", en: "Back to top" },
    rights: { ca: "Tots els drets reservats.", es: "Todos los derechos reservados.", en: "All rights reserved." },
    footerTag: { ca: "IT Support · Sysadmin · Barcelona", es: "IT Support · Sysadmin · Barcelona", en: "IT Support · Sysadmin · Barcelona" },
    footerCols: {
      sections: { ca: "Seccions", es: "Secciones", en: "Sections" },
      more: { ca: "Més", es: "Más", en: "More" },
      projects: { ca: "Projectes", es: "Proyectos", en: "Projects" },
    },
    nav: {
      home: { ca: "Inici", es: "Inicio", en: "Home" },
      about: { ca: "Sobre mi", es: "Sobre mí", en: "About" },
      experience: { ca: "Experiència", es: "Experiencia", en: "Experience" },
      projects: { ca: "Projectes", es: "Proyectos", en: "Projects" },
      stack: { ca: "Stack", es: "Stack", en: "Stack" },
      education: { ca: "Formació", es: "Formación", en: "Education" },
      contact: { ca: "Contacte", es: "Contacto", en: "Contact" },
    },
    sections: {
      about: { kicker: { ca: "Qui soc", es: "Quién soy", en: "About me" }, title: { ca: "Sobre mi", es: "Sobre mí", en: "About me" } },
      experience: { kicker: { ca: "Trajectòria", es: "Trayectoria", en: "Career" }, title: { ca: "Experiència", es: "Experiencia", en: "Experience" } },
      projects: { kicker: { ca: "El que he fet", es: "Lo que he hecho", en: "What I've built" }, title: { ca: "Projectes", es: "Proyectos", en: "Projects" } },
      stack: { kicker: { ca: "Eines i tecnologies", es: "Herramientas y tecnologías", en: "Tools & tech" }, title: { ca: "Stack", es: "Stack", en: "Stack" } },
      education: { kicker: { ca: "Estudis", es: "Estudios", en: "Studies" }, title: { ca: "Formació", es: "Formación", en: "Education" } },
      contact: { kicker: { ca: "Parlem", es: "Hablemos", en: "Let's talk" }, title: { ca: "Contacte", es: "Contacto", en: "Contact" } },
    },
    meta: {
      title: { ca: "Miquel Molina Pedrero · IT Support & Sysadmin", es: "Miquel Molina Pedrero · IT Support & Sysadmin", en: "Miquel Molina Pedrero · IT Support & Sysadmin" },
      description: {
        ca: "Estudiant de CFGS ASIX i tècnic en pràctiques d'IT Support i administració de sistemes a Barcelona. Linux, AWS, Kubernetes.",
        es: "Estudiante de CFGS ASIX y técnico en prácticas de IT Support y administración de sistemas en Barcelona. Linux, AWS, Kubernetes.",
        en: "CFGS ASIX student and IT Support & sysadmin intern in Barcelona. Linux, AWS, Kubernetes.",
      },
    },
    project: {
      view: { ca: "Veure projecte", es: "Ver proyecto", en: "View project" },
      back: { ca: "Tornar als projectes", es: "Volver a proyectos", en: "Back to projects" },
      overview: { ca: "Descripció", es: "Descripción", en: "Overview" },
      features: { ca: "Característiques", es: "Características", en: "Features" },
      what_i_did: { ca: "Què vaig fer", es: "Qué hice", en: "What I did" },
      results: { ca: "Resultats", es: "Resultados", en: "Results" },
      challenges: { ca: "Reptes", es: "Retos", en: "Challenges" },
      details: { ca: "Detalls", es: "Detalles", en: "Details" },
      gallery: { ca: "Galeria", es: "Galería", en: "Gallery" },
      more: { ca: "Més projectes", es: "Más proyectos", en: "More projects" },
      cta: { ca: "Treballem junts?", es: "¿Trabajamos juntos?", en: "Work together?" },
      ctaText: { ca: "Estic obert a noves oportunitats i col·laboracions.", es: "Estoy abierto a nuevas oportunidades y colaboraciones.", en: "I'm open to new opportunities and collaborations." },
      repo: { ca: "Veure codi", es: "Ver código", en: "View code" },
      open: { ca: "Obrir imatge", es: "Abrir imagen", en: "Open image" },
      close: { ca: "Tancar", es: "Cerrar", en: "Close" },
      prev: { ca: "Anterior", es: "Anterior", en: "Previous" },
      next: { ca: "Següent", es: "Siguiente", en: "Next" },
      kind: { ca: "Tipus", es: "Tipo", en: "Type" },
      year: { ca: "Any", es: "Año", en: "Year" },
      duration: { ca: "Durada", es: "Duración", en: "Duration" },
      team: { ca: "Equip", es: "Equipo", en: "Team" },
      status: { ca: "Estat", es: "Estado", en: "Status" },
      flowCaption: { ca: "Flux de dades simplificat", es: "Flujo de datos simplificado", en: "Simplified data flow" },
    },
  },
};
