import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function PushWeight({ error, setError, setWeight, handleClick }) {
    return (
        <>
            <div className='flex flex-row justify-center'>
                <Input
                    style={{width: '7rem'}}
                    placeholder="Your weight"
                    onChange={(e) => { setError(false); setWeight(e.target.value); }}
                    className={`rounded-3xl bg-panna text-primary border-2 ${!error ? 'border-green' : 'border-red'}`}
                    />
                <Button onClick={handleClick}
                    className="ml-3 rounded-xl bg-gray text-white hover:bg-green hover:text-primary"
                    >
                    PUSH
                </Button>
            </div>
        </>
    );
}

export { PushWeight };