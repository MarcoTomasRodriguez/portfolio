import Image from "next/image";
import { Badge, BadgeProps } from "../Badge";

export type ExperienceProps = {
	years: string;
	title: string;
	company: string;
	points?: string[];
	logo?: string;
	badges?: BadgeProps[];
};

export default function Experience({ logo, title, company, years, points, badges, ...props }: ExperienceProps) {
	return (
		<div {...props} className="flex flex-col p-5 space-y-2 shadow rounded">
	  	<div className="flex flex-row space-x-4">
				<div className="relative w-14 h-14 my-1">
					<Image layout="fill" objectFit="cover" className="rounded" src={logo || "/img/default-company.png"} alt={`${company} logo`} />
				</div>
				<div>
					<p className="font-bold">{title}</p>
					<p className="text-sm">{company}</p>
					<p className="text-sm opacity-80">{years}</p>
				</div>
	  	</div>
			<ul className="list-disc list-inside text-sm">
				{points && points.map((point, index) => <li key={index}>{point}</li>)}
			</ul>
	  	{badges && (
				<div className="flex flex-row flex-wrap -mt-1">
					{badges.map((badge, index) => (
						<Badge key={index} text={badge.text} color={badge.color} />
					))}
				</div>
			)}
		</div>
	);
}
