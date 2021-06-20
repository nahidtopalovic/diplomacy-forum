import { Button, ButtonGroup } from '@chakra-ui/button';

const SortingButtons = ({ buttons, selected, setSelected }) => {
    return (
        <ButtonGroup variant="outline" spacing="0" size="sm">
            {buttons.map((button) => (
                <Button
                    key={button}
                    onClick={() => setSelected(button)}
                    isActive={selected === button}
                    variant="outline"
                    colorScheme="gray"
                >
                    {button}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default SortingButtons;
