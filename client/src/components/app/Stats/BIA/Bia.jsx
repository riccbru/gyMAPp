import { BiaAccordion } from './BiaAccordion';
import { Accordion } from "@/components/ui/accordion";

function Bia({index, bia}) {
    return (
        <>
            <div className='flex flex-row justify-center mb-5'>
                <div className='flex items-center text-center'>
                    <Accordion type="multiple" collapsible="false" style={{width: '34rem'}}>
                        <BiaAccordion index={index} bia={bia} />
                    </Accordion>
                </div>
            </div>
        </>
    );
}

export { Bia };