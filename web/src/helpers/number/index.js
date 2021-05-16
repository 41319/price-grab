export const calculateSavings = (originalPrice, comparePrice) => {
    const saving = ((comparePrice - originalPrice) / originalPrice) * 100;
    return saving > 0 ? saving.toFixed(2) : 0
}
  