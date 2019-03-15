IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('dbo.UpdateBabyFood'))
   exec('CREATE PROCEDURE [dbo].[UpdateBabyFood] AS BEGIN SET NOCOUNT ON; END')
GO

ALTER PROC [dbo].[UpdateBabyFood] (
	@Food varchar(200),
	@Liked bit,
	@Disliked bit,
	@AllergyReaction bit,
	@Comments varchar(500)
)

AS
BEGIN
    if exists (select 1 from BabyFood where lower(Food) = lower(@Food)) begin
		update BabyFood set
			Liked = @Liked
			, Disliked = @Disliked
			, AllergyReaction = @AllergyReaction
			, Comments = Comments
		where lower(Food) = lower(@Food)

		select ID from BabyFood where lower(Food) = lower(@Food)
	end
	else begin
		select 0
	end
END
GO