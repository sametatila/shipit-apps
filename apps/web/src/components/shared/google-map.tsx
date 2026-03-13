interface GoogleMapProps {
  address: string;
  className?: string;
}

export function GoogleMap({ address, className }: GoogleMapProps) {
  const encodedAddress = encodeURIComponent(address);

  return (
    <div className={className}>
      <iframe
        src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        className="h-full w-full rounded-lg border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Konum"
      />
    </div>
  );
}
