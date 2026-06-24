interface LoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loader({ text, size = 'md' }: LoaderProps) {
  const sizeClasses = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };
  return (
    <div className="flex flex-col items-center justify-center gap-3" data-testid="loader">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-muted border-t-primary`}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
