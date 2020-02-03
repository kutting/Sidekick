// Data type deinitions for ComicVine API
// See: https://comicvine.gamespot.com/api/
//		https://comicvine.gamespot.com/api/documentation

export interface ICVSeries {
	aliases: string;					// List of aliases the series is known by. A \n (newline) seperates each alias.
	api_detail_url: string;				// 	URL pointing to the series detail resource.
	character_credits?: any;			//	A list of characters that appear in this series.
	count_of_episodes: number;			//	Number of episodes included in this series.
	date_added: Date;					//	Date the series was added to Comic Vine.
	date_last_updated: Date;			//	Date the series was last updated on Comic Vine.
	deck: string;						//	Brief summary of the series.
	description: string;				//	Description of the series.
	episodes?: ICVEpisode[];			//	List of each episode of series.
	first_episode: ICVEpisode;			//	The first episode in this series.
	id: number;							//	Unique ID of the series.
	image: ICVImage;					//	Main image of the series.
	last_episode: ICVEpisode;			//	The last episode in this series.
	location_credits?: any;				//	List of locations that appeared in this series.
	name: string;						//	Name of the series.
	publisher: ICVPublisher;			//	The primary publisher a series is attached to.
	site_detail_url: string;			//	URL pointing to the series on Giant Bomb.
	start_year: string;					//	The first year this series appeared in comics.
}

export interface ICVEpisode {
	aliases?: string;					//	List of aliases the episode is known by.A \n(newline) seperates each alias.
	api_detail_url: string;				//	URL pointing to the episode detail resource.
	character_credits?: any;			//	A list of characters that appear in this episode.
	characters_died_in?: any;			//	A list of characters that died in this episode.
	concept_credits?: any;				//	A list of concepts that appear in this episode.
	air_date?: Date;					//	The air date of the episode.
	date_added?: Date;					//	Date the episode was added to Comic Vine.
	date_last_updated?: Date;			//	Date the episode was last updated on Comic Vine.
	deck?: string;						//	Brief summary of the episode.
	description?: string;				//	Description of the episode.
	first_appearance_characters?: any;	//	A list of characters in which this episode is the first appearance of the character.
	first_appearance_concepts?: any;	//	A list of concepts in which this episode is the first appearance of the concept.
	first_appearance_locations?: any;	//	A list of locations in which this episode is the first appearance of the location.
	first_appearance_objects?: any;		//	A list of objects in which this episode is the first appearance of the object.
	first_appearance_storyarcs?: any;	//	A list of storyarcs in which this episode is the first appearance of the story arc.
	first_appearance_teams?: any;		//	A list of teams in which this episode is the first appearance of the team.
	has_staff_review?: boolean;
	id: number;							//	Unique ID of the episode.
	image?: ICVImage;					//	Main image of the episode.
	episode_number: string;				//	The number assigned to the episode within a series.
	location_credits?: any;				//	List of locations that appeared in this episode.
	name: string;						//	Name of the episode.
	object_credits?: any;				//	List of objects that appeared in this episode.
	person_credits?: any;				//	List of people that worked on this episode.
	site_detail_url?: string;			//	URL pointing to the episode on Giant Bomb.
	story_arc_credits?: any;			//	List of story arcs this episode appears in.
	team_credits?: any;					//	List of teams that appear in this episode.
	series?: ICVSeries;					//	The series the episode belongs to.
}

export interface ICVImage {
	icon_url: string;
	medium_url: string;
	screen_url: string;
	screen_large_url: string;
	small_url: string;
	super_url: string;
	thumb_url: string;
	tiny_url: string;
	original_url: string;
	image_tags: string;
}

export interface ICVIssue {
	aliases: string;					//	List of aliases the issue is known by.A \n(newline) seperates each alias.
	api_detail_url: string;				//	URL pointing to the issue detail resource.
	character_credits?: any;			//	A list of characters that appear in this issue.
	characters_died_in?: any;			//	A list of characters that died in this issue.
	concept_credits?: any;				//	A list of concepts that appear in this issue.
	cover_date?: Date;					//	The publish date printed on the cover of an issue.
	date_added?: Date;					//	Date the issue was added to Comic Vine.
	date_last_updated?: Date;			//	Date the issue was last updated on Comic Vine.
	deck?: string;						//	Brief summary of the issue.
	description?: string;				//	Description of the issue.
	disbanded_teams?: any;				//	A list of teams that disbanded in this issue.
	first_appearance_characters?: any;	//	A list of characters in which this issue is the first appearance of the character.
	first_appearance_concepts?: any;	//	A list of concepts in which this issue is the first appearance of the concept.
	first_appearance_locations?: any;	//	A list of locations in which this issue is the first appearance of the location.
	first_appearance_objects?: any;		//	A list of objects in which this issue is the first appearance of the object.
	first_appearance_storyarcs?: any;	//	A list of storyarcs in which this issue is the first appearance of the story arc.
	first_appearance_teams?: any;		//	A list of teams in which this issue is the first appearance of the team.
	has_staff_review?: boolean;
	id: number;							//	Unique ID of the issue.
	image?: any;						//	Main image of the issue.
	issue_number?: any;					//	The number assigned to the issue within the volume set.
	location_credits?: any;				//	List of locations that appeared in this issue.
	name: string;						//	Name of the issue.
	object_credits?: any;				//	List of objects that appeared in this issue.
	person_credits?: any;				//	List of people that worked on this issue.
	site_detail_url?: string;			//	URL pointing to the issue on Giant Bomb.
	store_date?: Date;					//	The date the issue was first sold in stores.
	story_arc_credits?: any;			//	List of story arcs this issue appears in.
	team_credits?: any;					//	List of teams that appear in this issue.
	teams_disbanded_in?: any;			//	List of teams that disbanded in this issue.
	volume?: any;						//	The volume this issue is a part of.
}

export interface ICVPublisher {
	aliases?: string;					//	List of aliases the publisher is known by.A \n(newline) seperates each alias.
	api_detail_url: string;				//	URL pointing to the publisher detail resource.
	characters?: any;					//	Characters related to the publisher.
	date_added?: Date;					//	Date the publisher was added to Comic Vine.
	date_last_updated?: Date;			//	Date the publisher was last updated on Comic Vine.
	deck?: string;						//	Brief summary of the publisher.
	description?: string;				//	Description of the publisher.
	id: number;							//	Unique ID of the publisher.
	image?: ICVImage;					//	Main image of the publisher.
	location_address?: any;				//	Street address of the publisher.
	location_city?: string;				//	City the publisher resides in.
	location_state?: string;			//	State the publisher resides in.
	name: string;						//	Name of the publisher.
	site_detail_url?: string;			//	URL pointing to the publisher on Giant Bomb.
	story_arcs?: any;					//	List of story arcs tied to this publisher.
	teams?: any;						//	List of teams this publisher is a member of.
	volumes?: any;						//	List of volumes this publisher has put out.
}
