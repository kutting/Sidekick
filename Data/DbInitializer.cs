using System.Linq;
using Sidekick.Models;

namespace Sidekick.Data
{
	public class DbInitializer
	{
		public static void Initialize(SidekickContext context)
		{
			context.Database.EnsureCreated();

			InitializeConditionCodes(context);
			InitializeStateCodes(context);
		}

		// Initialize the data in the ConditionCodes table.
		// The set of condition codes came from: https://www.mycomicshop.com/help/grading
		// I chose the simplere basic grading scale. This is something I would normally discuss with the client.
		private static void InitializeConditionCodes(SidekickContext context)
		{
			if (!context.ConditionCodes.Any())
			{
				var conditionCodes = new ConditionCode[]
				{
					new ConditionCode{ Name="NM Near Mint" },
					new ConditionCode{ Name="VF Very Fine" },
					new ConditionCode{ Name="FN Fine" },
					new ConditionCode{ Name="VG Very Good" },
					new ConditionCode{ Name="GD Good" },
					new ConditionCode{ Name="FR Fair" },
					new ConditionCode{ Name="PR Poor" }
				};
				foreach (ConditionCode conditionCode in conditionCodes)
				{
					context.ConditionCodes.Add(conditionCode);
				}
				context.SaveChanges();
			}
		}

		// Initialize the data in the StateCodes table.
		// The set of state codes came from: https://abbreviations.yourdictionary.com/articles/state-abbrev.html
		private static void InitializeStateCodes(SidekickContext context)
		{
			if (!context.StateCode.Any())
			{
				var stateCodes = new StateCode[]
				{
					new StateCode{ Abbreviation="AL", Name="Alabama" },
					new StateCode{ Abbreviation="AK", Name="Alaska" },
					new StateCode{ Abbreviation="AZ", Name="Arizona" },
					new StateCode{ Abbreviation="AR", Name="Arkansas" },
					new StateCode{ Abbreviation="CA", Name="California" },
					new StateCode{ Abbreviation="CO", Name="Colorado" },
					new StateCode{ Abbreviation="CT", Name="Connecticut" },
					new StateCode{ Abbreviation="DE", Name="Delaware" },
					new StateCode{ Abbreviation="FL", Name="Florida" },
					new StateCode{ Abbreviation="GA", Name="Georgia" },
					new StateCode{ Abbreviation="HI", Name="Hawaii" },
					new StateCode{ Abbreviation="ID", Name="Idaho" },
					new StateCode{ Abbreviation="IL", Name="Illinois" },
					new StateCode{ Abbreviation="IN", Name="Indiana" },
					new StateCode{ Abbreviation="IA", Name="Iowa" },
					new StateCode{ Abbreviation="KS", Name="Kansas" },
					new StateCode{ Abbreviation="KY", Name="Kentucky" },
					new StateCode{ Abbreviation="LA", Name="Louisiana" },
					new StateCode{ Abbreviation="ME", Name="Maine" },
					new StateCode{ Abbreviation="MD", Name="Maryland" },
					new StateCode{ Abbreviation="MA", Name="Massachusetts" },
					new StateCode{ Abbreviation="MI", Name="Michigan" },
					new StateCode{ Abbreviation="MN", Name="Minnesota" },
					new StateCode{ Abbreviation="MS", Name="Mississippi" },
					new StateCode{ Abbreviation="MO", Name="Missouri" },
					new StateCode{ Abbreviation="MT", Name="Montana" },
					new StateCode{ Abbreviation="NE", Name="Nebraska" },
					new StateCode{ Abbreviation="NV", Name="Nevada" },
					new StateCode{ Abbreviation="NH", Name="New Hampshire" },
					new StateCode{ Abbreviation="NJ", Name="New Jersey" },
					new StateCode{ Abbreviation="NM", Name="New Mexico" },
					new StateCode{ Abbreviation="NY", Name="New York" },
					new StateCode{ Abbreviation="NC", Name="North Carolina" },
					new StateCode{ Abbreviation="ND", Name="North Dakota" },
					new StateCode{ Abbreviation="OH", Name="Ohio" },
					new StateCode{ Abbreviation="OK", Name="Oklahoma" },
					new StateCode{ Abbreviation="OR", Name="Oregon" },
					new StateCode{ Abbreviation="PA", Name="Pennsylvania" },
					new StateCode{ Abbreviation="RI", Name="Rhode Island" },
					new StateCode{ Abbreviation="SC", Name="South Carolina" },
					new StateCode{ Abbreviation="SD", Name="South Dakota" },
					new StateCode{ Abbreviation="TN", Name="Tennessee" },
					new StateCode{ Abbreviation="TX", Name="Texas" },
					new StateCode{ Abbreviation="UT", Name="Utah" },
					new StateCode{ Abbreviation="VT", Name="Vermont" },
					new StateCode{ Abbreviation="VA", Name="Virginia" },
					new StateCode{ Abbreviation="WA", Name="Washington" },
					new StateCode{ Abbreviation="WV", Name="West Virginia" },
					new StateCode{ Abbreviation="WI", Name="Wisconsin" },
					new StateCode{ Abbreviation="WY", Name="Wyoming" }
				};
				foreach (StateCode stateCode in stateCodes)
				{
					context.StateCode.Add(stateCode);
				}
				context.SaveChanges();
			}
		}
	}
}
