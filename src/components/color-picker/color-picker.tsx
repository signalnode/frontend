import { SketchPicker } from 'react-color';

type ColorPicker = { color: string; open: boolean; onToggleOpenClose: () => void; onColorSelected: (color: string) => void };
export function ColorPicker({ color, open, onToggleOpenClose, onColorSelected }: ColorPicker) {
  return (
    <div className="color-picker">
      <div className="color-picker-button" onClick={onToggleOpenClose}>
        <div className="color-picker-color" style={{ background: color }}></div>
      </div>
      {open && (
        <div className="color-picker-popover">
          <div className="color-picker-cover" onClick={onToggleOpenClose}></div>
          <SketchPicker color={color} onChangeComplete={(color) => onColorSelected(color.hex)} />
        </div>
      )}
    </div>
  );
}
