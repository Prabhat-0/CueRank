const Container = ({
  children,
  id,
  parentContainerStyle = "",
  childContainerStyle = "",
}) => {
  return (
    <section
      id={id}
      aria-label={`${id} section`}
      className={`w-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-15 ${parentContainerStyle}`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1200px] flex-col items-start px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 ${childContainerStyle}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Container;