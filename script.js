document.addEventListener("DOMContentLoaded", function () {

    console.log("DHV JavaScript loaded successfully");


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("dhvTheme");


    function setTheme(theme) {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        if (themeToggle) {

            if (theme === "dark") {

                themeToggle.textContent = "☀️";

            } else {

                themeToggle.textContent = "🌙";

            }

        }

    }


    if (savedTheme === "dark") {

        setTheme("dark");

    } else {

        setTheme("light");

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const currentTheme =
                    document.documentElement
                    .getAttribute("data-theme");

                const newTheme =
                    currentTheme === "dark"
                    ? "light"
                    : "dark";

                setTheme(newTheme);

                localStorage.setItem(
                    "dhvTheme",
                    newTheme
                );

            }
        );

    }



    /* =====================================================
       HAMBURGER MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            function () {

                nav.classList.toggle("active");

                menuToggle.classList.toggle("active");


                const isOpen =
                    nav.classList.contains("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );


        /* CLOSE MENU WHEN LINK IS CLICKED */

        const navLinks =
            nav.querySelectorAll(".nav-link");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    nav.classList.remove("active");

                    menuToggle.classList.remove("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.1
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    /* =====================================================
       PORTFOLIO FILTER
    ===================================================== */

    const filters =
        document.querySelectorAll(
            ".filter"
        );

    const portfolioCards =
        document.querySelectorAll(
            ".portfolio-card"
        );


    filters.forEach(function (filterButton) {

        filterButton.addEventListener(
            "click",
            function () {

                filters.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                filterButton.classList.add(
                    "active"
                );


                const filter =
                    filterButton.dataset.filter;


                portfolioCards.forEach(
                    function (card) {

                        const category =
                            card.dataset.category;


                        if (
                            filter === "all" ||
                            filter === category
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    });



    /* =====================================================
       PROJECT MODAL
    ===================================================== */

    const modal =
        document.getElementById(
            "projectModal"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalCategory =
        document.getElementById(
            "modalCategory"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );


    const projects = {

        business: {

            category: "Web Design",

            title: "Business Website",

            image: "BUSINESS WEBSITE",

            description:
                "A modern website concept designed to present a business, its services and its brand professionally online."

        },


        church: {

            category: "Web Design",

            title: "Church Website",

            image: "CHURCH WEBSITE",

            description:
                "A clean and welcoming website concept for a church or Christian organization."

        },


        organization: {

            category: "Web Design",

            title: "Organization Website",

            image: "ORGANIZATION",

            description:
                "A professional website concept designed to present an organization, its mission and activities."

        },


        portfolio: {

            category: "Web Design",

            title: "Portfolio Website",

            image: "PORTFOLIO",

            description:
                "A modern portfolio website concept for showcasing creative work, projects and skills."

        },


        logo: {

            category: "Visual Design",

            title: "Brand Identity",

            image: "LOGO DESIGN",

            description:
                "A professional visual identity concept designed to create a strong and consistent brand presence."

        },


        photo: {

            category: "Photography",

            title: "Professional Portrait",

            image: "PROFESSIONAL PHOTO",

            description:
                "Professional photo editing and visual enhancement."

        },


        event: {

            category: "Visual Design",

            title: "Event Design",

            image: "EVENT DESIGN",

            description:
                "Creative visual design for events, ceremonies and special occasions."

        },


        restoration: {

            category: "Photography",

            title: "Photo Restoration",

            image: "PHOTO RESTORATION",

            description:
                "Photo restoration and enhancement for old photographs."

        }

    };


    function openModal(projectName) {

        if (!modal) {
            return;
        }


        const project =
            projects[projectName];


        if (!project) {
            return;
        }


        modalImage.textContent =
            project.image;

        modalCategory.textContent =
            project.category;

        modalTitle.textContent =
            project.title;

        modalDescription.textContent =
            project.description;


        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    const projectButtons =
        document.querySelectorAll(
            ".project-btn"
        );


    projectButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const projectName =
                        button.dataset.project;


                    openModal(
                        projectName
                    );

                }
            );

        }
    );


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();


                if (nav && menuToggle) {

                    nav.classList.remove(
                        "active"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById(
            "backTop"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (!backTop) {
                return;
            }


            if (
                window.scrollY > 500
            ) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        }
    );


    if (backTop) {

        backTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            navLinks.forEach(
                                function (link) {

                                    link.classList.remove(
                                        "active"
                                    );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        "#" +
                                        entry.target.id
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(
            function (section) {

                sectionObserver.observe(
                    section
                );

            }
        );

    }



    /* =====================================================
       WHATSAPP PROJECT FORM
    ===================================================== */

    const projectForm =
        document.getElementById(
            "projectForm"
        );


    if (projectForm) {

        const nameInput =
            document.getElementById(
                "clientName"
            );

        const phoneInput =
            document.getElementById(
                "clientPhone"
            );

        const projectType =
            document.getElementById(
                "projectType"
            );

        const description =
            document.getElementById(
                "projectDescription"
            );

        const nameError =
            document.getElementById(
                "nameError"
            );

        const phoneError =
            document.getElementById(
                "phoneError"
            );

        const projectTypeError =
            document.getElementById(
                "projectTypeError"
            );

        const descriptionError =
            document.getElementById(
                "descriptionError"
            );

        const formStatus =
            document.getElementById(
                "formStatus"
            );


        projectForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* CLEAR ERRORS */

                nameError.textContent = "";

                phoneError.textContent = "";

                projectTypeError.textContent = "";

                descriptionError.textContent = "";

                formStatus.textContent = "";

                formStatus.className =
                    "form-status";


                let valid = true;


                /* NAME */

                if (
                    nameInput.value.trim() === ""
                ) {

                    nameError.textContent =
                        "Please enter your name.";

                    valid = false;

                }


                /* PHONE */

                if (
                    phoneInput.value.trim() === ""
                ) {

                    phoneError.textContent =
                        "Please enter your phone number.";

                    valid = false;

                }


                /* PROJECT TYPE */

                if (
                    projectType.value === ""
                ) {

                    projectTypeError.textContent =
                        "Please select a project type.";

                    valid = false;

                }


                /* DESCRIPTION */

                if (
                    description.value.trim() === ""
                ) {

                    descriptionError.textContent =
                        "Please describe your project.";

                    valid = false;

                }


                if (!valid) {

                    formStatus.textContent =
                        "Please complete all required fields.";

                    formStatus.classList.add(
                        "error"
                    );

                    return;

                }


                /* GET VALUES */

                const name =
                    nameInput.value.trim();

                const phone =
                    phoneInput.value.trim();

                const type =
                    projectType.value;

                const details =
                    description.value.trim();


                /* WHATSAPP MESSAGE */

                const message =

`Hello Digital Hubert Vision,

I would like to start a project.

Name: ${name}

Phone: ${phone}

Project Type: ${type}

Project Description:
${details}

Thank you.`;


                /* WHATSAPP URL */

                const whatsappURL =
                    "https://wa.me/237698055978?text=" +
                    encodeURIComponent(message);


                /* SUCCESS MESSAGE */

                formStatus.textContent =
                    "Your project details are ready. WhatsApp is opening...";

                formStatus.classList.add(
                    "success"
                );


                /* OPEN WHATSAPP */

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


});