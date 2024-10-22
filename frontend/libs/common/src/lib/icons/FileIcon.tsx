export function FileIcon({ width = 18 }: { width?: number | string } = {}) {
  return (
    <svg fill="none" viewBox="0 0 18 18" width={width}>
      <path
        d="M10.5 2.25V5.25C10.5 5.44891 10.579 5.63968 10.7197 5.78033C10.8603 5.92098 11.0511 6 11.25 6H14.25M10.5 2.25H5.25C4.85218 2.25 4.47064 2.40804 4.18934 2.68934C3.90804 2.97064 3.75 3.35218 3.75 3.75V14.25C3.75 14.6478 3.90804 15.0294 4.18934 15.3107C4.47064 15.592 4.85218 15.75 5.25 15.75H12.75C13.1478 15.75 13.5294 15.592 13.8107 15.3107C14.092 15.0294 14.25 14.6478 14.25 14.25V6M10.5 2.25L14.25 6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
