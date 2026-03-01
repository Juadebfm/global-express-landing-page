import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ComingSoon = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-[color:var(--text)] px-6">
      <h1 className="text-[40px] font-bold max-md:text-[32px] max-sm:text-[28px]">
        {title}
      </h1>
      <p className="mt-4 text-[color:var(--text-muted)] text-lg max-sm:text-base text-center">
        This page is coming soon. We're working hard to bring you something
        great.
      </p>
      <Link
        to="/"
        className="mt-8 bg-[color:var(--accent)] text-[color:var(--accent-contrast)] px-8 py-3 rounded-lg font-semibold transition hover:bg-[color:var(--accent-hover)]"
      >
        Back to Home
      </Link>
    </div>
  );
};

ComingSoon.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ComingSoon;
