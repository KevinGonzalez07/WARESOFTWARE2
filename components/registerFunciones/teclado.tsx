export function crearTecladoHandlers(
  pin: string,
  setPin: (pin: string) => void
) {
  const handleNumberClick = (num: string) => {
    if (pin.length < 4) setPin(pin + num);
  };

  const handleClear = () => {
    setPin('');
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return {
    handleNumberClick,
    handleClear,
    handleBackspace,
  };
}
