import { memo, useMemo, useState } from 'react';
// import { MiniChart, SymbolOverview } from 'react-tradingview-embed';
import json from './StockMini.json';
import Widget from '../../components/Widget/Widget';
import { WidgetHeight, WidgetWidth } from '../../utils/constants';
import { PubSubEvent, useSub } from '../../hooks/usePubSub';

type Props = {
  wid: string;
  symbol: string;
};

export default function StockMini({ wid, symbol }: Props) {
  const [currentSymbol, setCurrentSymbol] = useState(symbol);
  const [theme, setTheme] = useState(localStorage.getItem('nightwind-mode') ?? 'dark');
  useSub(PubSubEvent.ThemeChange, () => {
    setTheme(localStorage.getItem('nightwind-mode') ?? 'dark');
  });

  // memo: to avoid re-rendering (when moving widget)
  const Chart = memo(() => {
    return (
      <></>
    );
  });

  return (
    <Widget
      wid={wid}
      schema={json.schema}
      w={json.info.w}
      h={json.info.h}
      cn="overflow-hidden"
      onSettings={({ settings }) => {
        setCurrentSymbol(settings?.symbol ?? symbol); // default to symbol prop if no settings
      }}
      render={() => {
        return (
          <div className="p-2">
            Stock Mini
          </div>
        );
      }}
    />
  );
}
