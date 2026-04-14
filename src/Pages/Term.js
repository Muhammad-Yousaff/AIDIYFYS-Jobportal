import React, { useState } from "react";
import { Link } from "react-router-dom";
import { termandcondition } from "../Data/Termandcondition"
import CardBorder from "../components/CardBorder";
import Arrow from "../components/Arrow";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Term = () => {
    const [selected, setSelected] = useState("termsandcondition");
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAllQuestions, setShowAllQuestions] = useState(false);

    const selectedCategory = termandcondition.find((item) => item.id === selected);
    const filteredQuestions = selectedCategory?.questions.filter((question) =>
        question.title.toLowerCase().includes(selectedOption?.value?.toLowerCase() || "")
    );

    const handleViewMore = () => {
        setShowAllQuestions(!showAllQuestions);
    };

    const selectedQuestionIndex = filteredQuestions?.findIndex(question => question.title === selectedOption?.value);
    const reorderedQuestions = [...(filteredQuestions || [])];
    if (selectedQuestionIndex !== -1 && selectedQuestionIndex !== undefined) {
        const selectedQuestion = reorderedQuestions.splice(selectedQuestionIndex, 1);
        reorderedQuestions.unshift(selectedQuestion[0]);
    }

    const questionsToDisplay = showAllQuestions ? reorderedQuestions : reorderedQuestions.slice(0, 5);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Terms & Conditions</title>
                    <meta name="description"
                        content="Review the terms and conditions of Aidifys. Learn about the guidelines, 
                        policies, and legal agreements that govern the use of our platform and services." />
                    <meta property="og:title" content="Terms & Conditions - Aidifys" />
                    <meta property="og:description"
                        content="Understand the terms and conditions of using Aidifys. Explore the rules and 
                    regulations that ensure a secure and reliable platform for job seekers and employers." />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
                    <meta property="og:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
                    <meta property="og:url" content="https://www.aidifys.com/terms-conditions" />
                </Helmet>
                <div className="min-h-[100vh] mt-28">
                    <div className="px-[5%] md:px-[14%] pt-[5%]">
                        <div>
                            <h1 className='text-sky-500 font-sans text-2xl text-bold text-center mb-10'>
                                Terms & Conditions
                            </h1>
                        </div>
                        <p className="text-md text-secondary">
                            Find answers to the most commonly asked questions below. Search for
                            topics you are interested in or sort by category. If you still can&apos;t find the answer you&apos;re looking for, just <Link to="/contact" className="text-blue font-semibold"> Contact us!</Link>
                        </p>
                        <div className="py-4 md:p-8 my-10 flex flex-col gap-4 lg:gap-0 lg:flex-row">
                            <div className="relative w-full lg:w-[40%]">
                                <ol className="h-full">
                                    {termandcondition.map((item) => (
                                        <li className="ms-4 mt-4" key={item.id}>
                                            <div className="absolute w-3 h-3 bg-blue rounded-full mt-1.5 -start-1.5 border border-white"></div>
                                            <time
                                                className={`mb-1 text-md font-normal leading-none hover:text-blue cursor-pointer
                   ${selected === item.id ? "text-blue" : "text-secondary"}`}
                                                onClick={() => setSelected(item.id)}
                                            >
                                                {item.title}
                                            </time>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="flex-1">
                                <h2 className="font-semibold text-secondary text-xl">
                                    {selectedCategory?.title}
                                </h2>
                                <hr className="h-[2px] text-black bg-tertiary my-2" />
                                <div className="w-full mt-4 flex flex-col gap-2">
                                    {questionsToDisplay?.map((question, index) => (
                                        <CardBorder
                                            key={index}
                                            title={question.title}
                                            content={question.desc}
                                            open={question.title === selectedOption?.value}
                                        />
                                    ))}
                                    {!showAllQuestions && (
                                        <button className="text-blue underline text-left" onClick={handleViewMore}>
                                            View More
                                        </button>
                                    )}
                                    {showAllQuestions && (
                                        <button className="text-blue underline text-left" onClick={handleViewMore}>
                                            View Less
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Arrow />
                </div>
            </HelmetProvider>
        </>

    );
};

export default Term;
