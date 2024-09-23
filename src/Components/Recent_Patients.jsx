import React from 'react';

const RecentPatients = () => {
    const patients = [
        {
            name: "Neil Sims",
            imgSrc: "/docs/images/people/profile-picture-1.jpg",
            alt: "Neil image"
        },
        {
            name: "Bonnie Green",
            imgSrc: "/docs/images/people/profile-picture-3.jpg",
            alt: "Bonnie image"
        },
        {
            name: "Michael Gough",
            imgSrc: "/docs/images/people/profile-picture-2.jpg",
            alt: "Michael image"
        },
        {
            name: "Lana Byrd",
            imgSrc: "/docs/images/people/profile-picture-4.jpg",
            alt: "Lana image"
        },
        {
            name: "Thomas Lean",
            imgSrc: "/docs/images/people/profile-picture-5.jpg",
            alt: "Thomas image"
        },
    ];

    return (
        <div className="w-full max-w-md p-4 bg-blue-300 border border-blue-200 rounded-lg shadow sm:p-8">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-blue-300 dark:text-white">Recent Patients</h5>
                <a href="#" className="text-sm font-medium text-blue-300 hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {patients.map((patient, index) => (
                        <li key={index} className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src={patient.imgSrc} alt={patient.alt} />
                                </div>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {patient.name}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentPatients;
