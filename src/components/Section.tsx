import React from "react";

type SectionProps = React.ComponentProps<'section'> & {
	title: string;
}

export default function Section({ title, children, ...props }: SectionProps) {
	return (
		<section className="w-full h-full py-12" {...props}>
			<h1 className=" mb-7 text-xl font-bold">{title}</h1>
			{children}
		</section>
	);
}