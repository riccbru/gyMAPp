import dayjs from 'dayjs';
import API from '@/lib/API';
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { BiaAccordion } from './BiaAccordion';
import { Accordion } from "@/components/ui/accordion"

const beautyDate = (date) => {
    return dayjs(date).format("MMMM D[,] YYYY");
}


function BiaTable() {

    const { isLogged } = useAuth()
    const [bias, setBias] = useState([]);
    
    useEffect(() => {
        API.bia()
        .then((res) => {
            setBias(res.BIAs);
        })
        .catch((err) => {
            console.log(`HOME.index.useEffect(BIA):\n${err}`);
        });
    }, [isLogged]);

    return(
        <div className='flex flex-col'>
            <div className="mt-10 mb-10 text-center font-extrabold text-3xl">BIAs</div>

            {bias[0]?.date ?
                bias.map((bia, index) => (
                    <div key={index}>
                        <div className='flex flex-row justify-center mb-5'>
                            <div className='flex items-center text-center'>
                                <Accordion type="multiple" collapsible="false" style={{width: '36rem'}}>
                                    <BiaAccordion index={index} bia={bia} />
                                </Accordion>
                            </div>
                        </div>
                    </div>
                ))
                :
                <div className='text-center'>No BIAs uploaded</div>
            }
                        
        </div>
    );
}

export { BiaTable };