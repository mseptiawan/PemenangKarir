import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FooterLayout from "@/Layouts/FooterLayout";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
const Portfolio = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("/data/portfolio.json")
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
            });
    }, []);
    return (
        <>
            <NavigationLayout />
            <section
                id="portfolio"
                className="xs:w-5/6 font-outfit md:w-4/6 ss:w-5/6 xxl:w-[1500px] text-white mx-auto portfolio-section py-16 px-4 -mt-10"
            >
                <Head title="Portofolio" />

                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl text-black font-bold mb-4">
                            Portofolio Kami
                        </h2>
                        <p className="text-lg text-gray-600">
                            Beberapa proyek terbaik yang pernah kami kerjakan
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="group bg-white border border-gray-200 text-black portfolio-item relative hover:shadow-xl rounded-lg overflow-hidden transition"
                            >
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        className="w-full object-cover rounded-t-lg"
                                        src={project.image}
                                        alt={project.title}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-black text-center">
                                            {project.title}
                                        </h3>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <FooterLayout />
        </>
    );
};

export default Portfolio;
