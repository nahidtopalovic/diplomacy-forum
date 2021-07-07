import { useState } from 'react';
import { Input } from '@chakra-ui/input';

const SearchByTag = () => {
    const [value, setValue] = useState('');
    const handleChange = (event) => setValue(event.target.value);

    return (
        <>
            <Input
                textAlign="center"
                value={value}
                onChange={handleChange}
                placeholder="Search by a tag name"
                size="sm"
                variant="flushed"
            />
        </>
    );
};

export default SearchByTag;
