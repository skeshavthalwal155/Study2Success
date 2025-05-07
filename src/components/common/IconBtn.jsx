export default function IconBtn({
    text,
    onClick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`flex items-center ${
          outline ? "border border-dark-yellow-50 bg-transparent" : "bg-dark-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-dark-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "dark:text-dark-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }