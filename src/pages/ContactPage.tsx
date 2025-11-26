import React, { useState, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClipLoader from 'react-spinners/ClipLoader';
import { HiOutlineMail, HiOutlineUser, HiOutlinePencilAlt, HiOutlineCheckCircle, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa';
import Map, { Marker, Popup, MapRef, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// =================================================================================
// 1. REUSABLE SUB-COMPONENTS
// =================================================================================

const ContactInfoItem: React.FC<{ icon: React.ReactElement; title: string; content: string; href?: string }> = ({ icon, title, content, href }) => {
    const Wrapper = href ? motion.a : motion.div;
    const wrapperProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
    return (
        <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
            <Wrapper {...wrapperProps} className="flex items-start gap-4 group">
                <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-red-100 dark:bg-slate-700 text-red-600 dark:text-red-300 transition-colors duration-300 group-hover:bg-red-200 dark:group-hover:bg-slate-600 [&>svg]:h-6 [&>svg]:w-6"
                >
                    {icon}
                </motion.div>
                <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">{content}</p>
                </div>
            </Wrapper>
        </motion.div>
    );
};

const MapDisplay: React.FC = () => {
    const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const [showPopup, setShowPopup] = useState(true);
    const mapRef = useRef<MapRef>(null);

    // Using your updated coordinates
    const officeLocation = { longitude: -0.19627, latitude: 51.55205 };

    const handleMarkerClick = () => {
        setShowPopup(p => !p);
        mapRef.current?.flyTo({ center: [officeLocation.longitude, officeLocation.latitude], zoom: 14, duration: 1500 });
    };

    if (!MAPBOX_TOKEN) {
        return (
            <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                className="h-64 w-full rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-center p-4"
            >
                Mapbox token not configured.
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            className="h-64 w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700"
        >
            <Map
                ref={mapRef}
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{ ...officeLocation, zoom: 12 }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
            >
                <NavigationControl position="top-right" />
                <FullscreenControl position="top-left" />
                <Marker 
                    longitude={officeLocation.longitude} 
                    latitude={officeLocation.latitude} 
                    anchor="bottom"
                    onClick={handleMarkerClick}
                >
                    <div className="relative cursor-pointer group">
                        <HiLocationMarker className="w-10 h-10 text-red-500 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                    </div>
                </Marker>
                {showPopup && (
                    <Popup
                        longitude={officeLocation.longitude}
                        latitude={officeLocation.latitude}
                        anchor="top"
                        onClose={() => setShowPopup(false)}
                        closeOnClick={false}
                        offset={15}
                    >
                        <div className="font-sans text-sm font-semibold">eSourcing Data</div>
                    </Popup>
                )}
            </Map>
        </motion.div>
    );
};

// =================================================================================
// 2. MAIN CONTACT PAGE COMPONENT
// =================================================================================

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
        // This sends the form data to your new Django endpoint
        const response = await fetch('/api/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An error occurred.');
        }

        setSuccess(true);
        // Clear the form on success
        setName('');
        setEmail('');
        setMessage('');

    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};
    
    const handleResetForm = () => {
        setName(''); setEmail(''); setMessage(''); setSuccess(false);
    }

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };

    // Restored original form style constants
    const inputWrapperClass = "relative";
    const inputIconClass = "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none";
    const inputClass = "block w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900/70 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition";

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-4xl grid lg:grid-cols-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50"
            >
                {/* --- Left Column: Info & Map --- */}
                <div className="p-8 sm:p-12">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col h-full space-y-8">
                        <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Get in Touch</h1>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">Have a question? We'd love to hear from you.</p>
                        </motion.div>
                        <div className="space-y-6">
                            <ContactInfoItem icon={<HiOutlineMail />} title="Email Us" content="info@winacontract.com" href="mailto:info@winacontract.com" />
                            <ContactInfoItem icon={<FaLinkedin />} title="Follow Us" content="eSourcing Data" href="https://www.linkedin.com/company/esourcing-data/" />
                        </div>
                        <div className="flex-grow flex flex-col justify-end">
                            <MapDisplay />
                        </div>
                    </motion.div>
                </div>

                {/* --- Right Column: Form --- */}
                <div className="p-8 sm:p-12 bg-slate-50 dark:bg-slate-800/50 flex items-center">
                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center justify-center text-center w-full">
                                <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full"><HiOutlineCheckCircle className="w-12 h-12 text-green-500" /></div>
                                <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-slate-100">Message Sent!</h2>
                                <p className="mt-2 text-slate-600 dark:text-slate-400">Thanks for reaching out. We'll get back to you shortly.</p>
                                <motion.button whileTap={{ scale: 0.95 }} onClick={handleResetForm} className="mt-8 px-6 py-2.5 text-sm font-semibold text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/50 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition-colors">
                                    Send Another
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} className="w-full">
                                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                    <div className={inputWrapperClass}>
                                        <HiOutlineUser className={inputIconClass} />
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Full Name" required autoComplete="name" />
                                    </div>
                                    <div className={inputWrapperClass}>
                                        <HiOutlineMail className={inputIconClass} />
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="Email Address" required autoComplete="email" />
                                    </div>
                                    <div className="relative">
                                        <HiOutlinePencilAlt className={`${inputIconClass} !top-3.5 !-translate-y-0`} />
                                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} min-h-[140px]`} placeholder="Your Message" required />
                                    </div>
                                    <div className="pt-2">
                                        <motion.button
                                            whileTap={{ scale: 0.97 }}
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full flex justify-center items-center px-4 py-3 text-sm font-semibold tracking-wide text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 disabled:bg-red-400 disabled:cursor-not-allowed transition-all duration-300"
                                        >
                                            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Send Message'}
                                        </motion.button>
                                    </div>
                                    {error && <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;