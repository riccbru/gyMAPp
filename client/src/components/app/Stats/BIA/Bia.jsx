import { Trash } from 'lucide-react';
import { BiaAccordion } from './BiaAccordion';
import { Accordion } from "@/components/ui/accordion";
import API from '@/lib/API';

function Bia({index, bia, setRefresh }) {

    const handleClick = async () => {
        try {
            await API.deleteBIA(bia.bid);
            setRefresh(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='flex flex-row justify-center mb-5'>
                <div className='flex items-center text-center align-middle gap-5'>
                    <Trash className='w-8 h-8 cursor-pointer hover:text-red' onClick={handleClick} />
                    <Accordion type="multiple" collapsible="false" style={{width: '34rem'}}>
                        <BiaAccordion index={index} bia={bia} />
                    </Accordion>
                </div>
            </div>
        </>
    );
}

export { Bia };