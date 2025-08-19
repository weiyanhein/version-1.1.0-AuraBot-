import { createContext, useContext, useState } from 'react';

const FooterContext = createContext();

export const FooterProvider = ({ children }) => {
    const [activeFooterSection, setActiveFooterSection] = useState(null);
    
    return (
        <FooterContext.Provider value={{ activeFooterSection, setActiveFooterSection }}>
            {children}
        </FooterContext.Provider>
    );
};

export const useFooter = () => useContext(FooterContext);