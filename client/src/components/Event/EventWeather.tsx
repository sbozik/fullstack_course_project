import * as React from 'react'
import { useWeather } from '../../hooks/useWeather'

type Props = { city?: string }

export const EventWeather: React.FC<Props> = ({ city }) => {
  const { loading, data, error } = useWeather(city)

  return (
    <div style={{ marginTop: 12 }}>
      <strong>
        Počasí
        {city ? ` – ${city}` : ''}
        :
      </strong>
      {' '}
      {loading && 'Načítám…'}
      {error && <span style={{ color: '#b00020' }}>{error}</span>}
      {data && (
        <span>
          Průměr:
          {' '}
          {data.average}
          {data.unit}
          , Min:
          {' '}
          {data.min}
          {data.unit}
          , Max:
          {' '}
          {data.max}
          {data.unit}
        </span>
      )}
    </div>
  )
}
