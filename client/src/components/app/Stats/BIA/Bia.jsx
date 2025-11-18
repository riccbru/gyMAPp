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
            <div className='flex flex-row justify-center mb-5 gap-5'>
                    <Accordion type="multiple" collapsible="false" style={{width: '22rem'}}>
                        <BiaAccordion index={index} bia={bia} />
                    </Accordion>
                    <Trash className='trashIcon' onClick={handleClick} />
            </div>
        </>
    );
}

export { Bia };